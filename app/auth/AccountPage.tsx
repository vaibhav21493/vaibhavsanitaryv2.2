import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthProvider";

const PROFILE_NAME_STORAGE_KEY = "vs.profile.full_name.v1";

export default function AccountPage() {
  const { user, signOut } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const displayName = fullName.trim() || user?.email?.split("@")[0] || "there";

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }
      setError(null);
      setInfo(null);
      setLoading(true);

      const { data, error: err } = await supabase
        .from("profiles")
        .select("user_id, full_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (err) {
        setError(err.message);
      } else if (data) {
        const row = data as { full_name?: unknown; phone?: unknown };
        const nextName = typeof row.full_name === "string" ? row.full_name : "";
        setFullName(nextName);
        localStorage.setItem(PROFILE_NAME_STORAGE_KEY, nextName);
        setPhone(typeof row.phone === "string" ? row.phone : "");
      }

      setLoading(false);
    }

    load();

    return () => {
      mounted = false;
    };
  }, [user]);

  const save = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);
    setInfo(null);

    const { error: err } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          full_name: fullName.trim(),
          phone: phone.trim(),
        },
        { onConflict: "user_id" },
      );

    setSaving(false);

    if (err) {
      setError(err.message);
      return;
    }

    setInfo(`Saved successfully. Hey, ${displayName}!`);
    localStorage.setItem(PROFILE_NAME_STORAGE_KEY, fullName.trim());
  };

  const logout = async () => {
    await signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="container mx-auto px-4 py-16 vs-route-enter">
          <Card className="mx-auto max-w-lg border-[#d0daea] shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-[#003B6F] text-lg font-bold">Your Account Profile</CardTitle>
              <CardDescription>Loading details...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-16 vs-route-enter">
        <Card className="mx-auto max-w-lg border-[#d0daea] shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#003B6F] flex items-center justify-center text-white text-xs font-bold">
                VS
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#003B6F]">Customer Dashboard</span>
            </div>
            <CardTitle className="text-[#0D1B2A] text-2xl font-bold">Welcome, {displayName}</CardTitle>
            <CardDescription>
              Your contact details are used to prepare custom quotations and confirm site deliveries.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-[#0D1B2A]">Registered Email</Label>
              <Input value={user?.email ?? ""} disabled className="bg-[#f8f9fb] border-[#d0daea] text-[#5a6a82]" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold text-[#0D1B2A]">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="border-[#d0daea] focus:border-[#003B6F]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-bold text-[#0D1B2A]">Phone / WhatsApp Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className="border-[#d0daea] focus:border-[#003B6F]"
              />
            </div>

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
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" asChild className="border-[#d0daea] text-xs">
                <Link to="/">Back to Store</Link>
              </Button>
              {user?.email === "pamartipranathi55@gmail.com" && (
                <Button variant="outline" size="sm" asChild className="border-[#003B6F] text-[#003B6F] text-xs">
                  <Link to="/admin">
                    <Shield className="size-3.5 mr-1 text-[#003B6F]" />
                    Admin Panel
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button onClick={save} disabled={saving} size="sm" className="bg-[#003B6F] hover:bg-[#00244A] text-white w-full sm:w-auto text-xs">
                {saving ? "Saving..." : "Save Profile"}
              </Button>
              <Button variant="secondary" onClick={logout} size="sm" className="w-full sm:w-auto text-xs">
                Logout
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
