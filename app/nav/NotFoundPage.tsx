import { Home, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4 py-14 vs-route-enter">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-10 shadow-sm">
          <h1 className="text-3xl font-bold text-primary">404 — Not found</h1>
          <p className="mt-2 text-muted-foreground">
            The page you’re trying to open doesn’t exist.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/">
                <Home className="size-4" />
                Home
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/nav/root">
                <LayoutGrid className="size-4" />
                Card Navigation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

