import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../auth/supabaseClient";
import { getNavNode } from "../nav/navTree";
import { useShop } from "../shop/ShopContext";

function getProductTitle(productId: string) {
  const node = getNavNode(productId);
  return node?.title ?? productId;
}

export default function RequestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useShop();

  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const cartItems = useMemo(
    () => Object.entries(cart).filter(([, qty]) => Number.isFinite(qty) && qty > 0),
    [cart],
  );

  const submitInquiry = async () => {
    if (!user) return;
    setBusy(true);
    setError(null);
    setInfo(null);

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: inquiryRow, error: inquiryErr } = await supabase
        .from("inquiries")
        .insert({
          user_id: user.id,
          email: user.email ?? null,
          full_name: typeof (profile as { full_name?: unknown } | null)?.full_name === "string" ? (profile as any).full_name : null,
          phone: typeof (profile as { phone?: unknown } | null)?.phone === "string" ? (profile as any).phone : null,
          note: note.trim() || null,
          status: "new",
        })
        .select("id")
        .single();

      if (inquiryErr) {
        setError(inquiryErr.message);
        return;
      }

      const inquiryId = (inquiryRow as { id?: unknown } | null)?.id;
      if (typeof inquiryId !== "string") {
        setError("Failed to create inquiry.");
        return;
      }

      const items = cartItems.map(([productId, qty]) => ({
        inquiry_id: inquiryId,
        product_id: productId,
        qty,
      }));

      if (items.length) {
        const { error: itemsErr } = await supabase.from("inquiry_items").insert(items);
        if (itemsErr) {
          setError(itemsErr.message);
          return;
        }
      }

      clearCart();
      setInfo("Request submitted successfully. We will contact you soon.");
      setTimeout(() => navigate("/account", { replace: true }), 600);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-16 vs-route-enter">
        <Card className="mx-auto max-w-2xl border-[#d0daea] shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#003B6F] flex items-center justify-center text-white text-xs font-bold">
                VS
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#003B6F]">Vaibhav Sanitary</span>
            </div>
            <CardTitle className="text-[#0D1B2A] text-2xl font-bold">Submit Formal Quotation Request</CardTitle>
            <CardDescription>
              Our sales engineers will review your required items and reach out directly with availability, brand tiers, and contractor support.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-xl border border-[#d0daea] bg-[#f8f9fb] p-8 text-center text-sm text-[#5a6a82]">
                Your inquiry cart is empty. Add products to cart before submitting a request.
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-[#003B6F] text-white">
                    <Link to="/nav/root">Browse Catalog</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-[#d0daea] bg-[#f8f9fb] p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#003B6F]">
                    Selected Materials ({cartItems.length} items)
                  </div>
                  <div className="mt-3 space-y-2">
                    {cartItems.map(([productId, qty]) => (
                      <div key={productId} className="flex items-center justify-between gap-3 text-sm bg-white p-2.5 rounded-lg border border-[#d0daea]/60">
                        <div className="min-w-0 font-semibold text-[#0D1B2A] truncate">{getProductTitle(productId)}</div>
                        <div className="shrink-0 font-bold text-[#003B6F] text-xs bg-[#003B6F]/10 px-2 py-0.5 rounded">
                          Qty: {qty}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#d0daea] bg-white p-4">
                  <div className="space-y-2">
                    <Label htmlFor="note" className="text-xs font-bold text-[#0D1B2A]">
                      Project Notes / Specific Brand Preferences (Optional)
                    </Label>
                    <Input
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Prefer Hindware Italian collection, need 500L Sintex tank, etc."
                      className="border-[#d0daea] focus:border-[#003B6F]"
                    />
                  </div>
                </div>
              </div>
            )}

            <Separator className="border-[#d0daea]" />

            {info ? (
              <div className="rounded-lg border border-[#003B6F]/30 bg-[#003B6F]/5 px-4 py-3 text-sm text-[#003B6F]">
                {info}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between border-t border-[#d0daea]/60 pt-4">
            <Button variant="outline" size="sm" asChild className="border-[#d0daea] text-xs">
              <Link to="/cart">Back to Cart</Link>
            </Button>
            <Button
              onClick={submitInquiry}
              disabled={busy || cartItems.length === 0}
              className="bg-[#003B6F] hover:bg-[#00244A] text-white font-semibold w-full sm:w-auto text-sm"
            >
              {busy ? "Submitting Request..." : "Submit Quotation Request"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
