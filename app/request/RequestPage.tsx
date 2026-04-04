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
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4 py-14 vs-route-enter">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-primary">Request on Website</CardTitle>
            <CardDescription>
              Submit your request here and we will contact you. WhatsApp requests are always available without login.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
                Your cart is empty. Add products to cart before submitting a request.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border bg-card p-4">
                  <div className="text-sm font-semibold text-primary">Items</div>
                  <div className="mt-3 space-y-2">
                    {cartItems.map(([productId, qty]) => (
                      <div key={productId} className="flex items-center justify-between gap-3 text-sm">
                        <div className="min-w-0 truncate">{getProductTitle(productId)}</div>
                        <div className="shrink-0 text-muted-foreground">x{qty}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-4">
                  <div className="space-y-2">
                    <Label htmlFor="note">Note (optional)</Label>
                    <Input
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Any size, brand, or quantity details…"
                    />
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {info ? (
              <div className="rounded-lg border border-[#4988C4]/30 bg-white px-4 py-3 text-sm text-[#0F2854]">
                {info}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="ghost" asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button onClick={submitInquiry} disabled={busy || cartItems.length === 0} className="w-full sm:w-auto">
              {busy ? "Submitting…" : "Submit request"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
