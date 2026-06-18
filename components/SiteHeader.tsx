import { BookOpen, History, Home, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import type { getCurrentUser } from "@/lib/auth";

type User = Awaited<ReturnType<typeof getCurrentUser>>;

export function SiteHeader({ user }: { user: User }) {
  return (
    <header className="topbar shell">
      <Link className="brand" href={user ? "/dashboard" : "/"}>
        <span className="brand-mark">UL</span>
        <span>Useful Little Times</span>
      </Link>
      <nav className="nav" aria-label="Main navigation">
        {user ? (
          <>
            <Link href="/dashboard">
              <Home size={16} aria-hidden />
              Home
            </Link>
            <Link href="/history">
              <History size={16} aria-hidden />
              History
            </Link>
            <Link href="/settings">
              <Settings size={16} aria-hidden />
              Settings
            </Link>
            <form action={signOutAction}>
              <button type="submit">Sign out</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/auth">
              <Sparkles size={16} aria-hidden />
              Start
            </Link>
            <a href="https://github.com/" rel="noreferrer">
              <BookOpen size={16} aria-hidden />
              Open source
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
