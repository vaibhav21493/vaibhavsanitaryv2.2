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
      <div className="min-h-screen bg-gradient-to-b from-[#BDE8F5] to-white">
        <div className="container mx-auto px-4 py-14 vs-route-enter">
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <CardTitle className="text-[#0F2854]">Your account</CardTitle>
              <CardDescription>Loading…</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BDE8F5] to-white">
      <div className="container mx-auto px-4 py-14 vs-route-enter">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-[#0F2854]">Hey, {displayName}</CardTitle>
            <CardDescription>
              We use your details to contact you about your inquiry requests.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

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
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-start w-full sm:w-auto">
              <Button variant="ghost" asChild>
                <Link to="/">Back to home</Link>
              </Button>
              {user?.email === "pamartipranathi55@gmail.com" && (
                <Button variant="outline" asChild>
                  <Link to="/admin">
                    <Shield className="size-4 mr-2" />
                    Admin Panel
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button onClick={save} disabled={saving} className="w-full sm:w-auto">
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button variant="secondary" onClick={logout} className="w-full sm:w-auto">
                Logout
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
