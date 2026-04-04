import { LogIn, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { useAuth } from "./AuthProvider";
import { supabase } from "./supabaseClient";

const PROFILE_NAME_STORAGE_KEY = "vs.profile.full_name.v1";

export default function AuthStatusButton() {
  const { user, loading } = useAuth();
  const [profileName, setProfileName] = useState<string>(
    () => localStorage.getItem(PROFILE_NAME_STORAGE_KEY) ?? "",
  );

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!user) {
        setProfileName("");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!mounted) return;
      const name = (data as { full_name?: unknown } | null)?.full_name;
      const next = typeof name === "string" ? name : "";
      setProfileName(next);
      localStorage.setItem(PROFILE_NAME_STORAGE_KEY, next);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const tooltipText = useMemo(() => {
    const n = profileName.trim();
    if (n) return n;
    const e = user?.email?.trim();
    if (e) return e;
    return "Account";
  }, [profileName, user?.email]);

  if (loading) return null;

  if (!user) {
    return (
      <Button
        variant="secondary"
        asChild
        className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border"
      >
        <Link to="/login">
          <LogIn className="size-4" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          asChild
          className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border"
        >
          <Link to="/account">
            <User className="size-4" />
            Account
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
