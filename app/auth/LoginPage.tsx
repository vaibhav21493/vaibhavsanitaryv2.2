import { Mail, Chrome } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthProvider";

const REDIRECT_STORAGE_KEY = "vs.auth.redirect.v1";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from ?? "/account";
  }, [location.state]);

  useEffect(() => {
    if (!user) return;
    const next = localStorage.getItem(REDIRECT_STORAGE_KEY) || "/account";
    localStorage.removeItem(REDIRECT_STORAGE_KEY);
    navigate(next, { replace: true });
  }, [user, navigate]);

  const signInGoogle = async () => {
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login",
        },
      });
      if (err) setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const sendEmailLink = async () => {
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      localStorage.setItem(REDIRECT_STORAGE_KEY, redirectTo);
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin + "/login",
        },
      });
      if (err) {
        setError(err.message);
        return;
      }
      setInfo("Sign-in link sent. Please check your Inbox/Spam and open the link to login.");
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="container mx-auto px-4 py-16 vs-route-enter">
          <Card className="mx-auto max-w-md border-[#d0daea] shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-[#003B6F] text-xl font-bold">You are already logged in</CardTitle>
              <CardDescription>Manage your inquiries and account profile.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full bg-[#003B6F] hover:bg-[#00244A] text-white">
                <Link to="/account">Go to Account Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="w-full border-[#d0daea]">
                <Link to="/">Back to Store Home</Link>
              </Button>
            </CardFooter>
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
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#003B6F] flex items-center justify-center text-white text-xs font-bold">
                VS
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#003B6F]">Vaibhav Sanitary</span>
            </div>
            <CardTitle className="text-[#0D1B2A] text-2xl font-bold">Customer Login</CardTitle>
            <CardDescription>Sign in to submit formal inquiries and track product requests.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="w-full border border-[#d0daea] bg-white text-[#0D1B2A] hover:bg-[#f8f9fb] shadow-sm font-semibold"
              onClick={signInGoogle}
              disabled={busy}
            >
              <Chrome className="size-4 mr-2 text-[#003B6F]" />
              Continue with Google
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#d0daea]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#5a6a82] font-medium">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-[#0D1B2A]">Email Address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#5a6a82]" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10 border-[#d0daea] focus:border-[#003B6F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#003B6F] hover:bg-[#00244A] text-white font-semibold"
              onClick={sendEmailLink}
              disabled={busy || !email}
            >
              {busy ? "Sending Link..." : "Send Magic Sign-in Link"}
            </Button>

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

          <CardFooter className="justify-between border-t border-[#d0daea]/60 pt-4">
            <Button variant="ghost" size="sm" asChild className="text-xs text-[#5a6a82]">
              <Link to="/">Back to Home</Link>
            </Button>
            <span className="text-xs text-[#5a6a82]">
              Passwordless & Secure Login
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
