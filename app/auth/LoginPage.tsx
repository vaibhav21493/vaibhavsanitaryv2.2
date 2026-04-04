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
      <div className="min-h-screen bg-gradient-to-b from-[#BDE8F5] to-white">
        <div className="container mx-auto px-4 py-14 vs-route-enter">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>You are already logged in</CardTitle>
              <CardDescription>Continue to your account.</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button asChild className="w-full">
                <Link to="/account">Go to account</Link>
              </Button>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/">Home</Link>
              </Button>
            </CardFooter>
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
            <CardTitle className="text-[#0F2854]">Login or Create Account</CardTitle>
            <CardDescription>Login to request products and send inquiries.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="w-full" onClick={signInGoogle} disabled={busy}>
              <Chrome className="size-4" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <Button className="w-full" onClick={sendEmailLink} disabled={busy || !email}>
              Send sign-in link
            </Button>

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

          <CardFooter className="justify-between">
            <Button variant="ghost" asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
