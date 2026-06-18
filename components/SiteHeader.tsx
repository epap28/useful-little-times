"use client";

import { BookOpen, History, Home, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { clearToken, isSignedIn } from "@/lib/api-client";
import { useSyncExternalStore } from "react";

function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function SiteHeader() {
  const signedIn = useSyncExternalStore(subscribeToAuthChanges, isSignedIn, () => false);

  function signOut() {
    clearToken();
    if (window.location.hostname === "epap28.github.io") {
      window.location.href = "https://epap28.github.io/useful-little-times/auth/";
      return;
    }
    window.location.href = "/auth";
  }

  return (
    <header className="topbar shell">
      <Link className="brand" href={signedIn ? "/dashboard" : "/"}>
        <span className="brand-mark">UL</span>
        <span>Useful Little Times</span>
      </Link>
      <nav className="nav" aria-label="Main navigation">
        {signedIn ? (
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
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth">
              <Sparkles size={16} aria-hidden />
              Start
            </Link>
            <a href="https://github.com/epap28/useful-little-times" rel="noreferrer">
              <BookOpen size={16} aria-hidden />
              Open source
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
