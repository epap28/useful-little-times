"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/api-client";

export function AuthClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submitSignUp(formData: FormData) {
    setError(null);
    setBusy(true);
    try {
      await signUp({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || "")
      });
      router.push("/settings?welcome=true");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create account.");
    } finally {
      setBusy(false);
    }
  }

  async function submitSignIn(formData: FormData) {
    setError(null);
    setBusy(true);
    try {
      await signIn({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || "")
      });
      router.push("/dashboard");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell stack">
      <section className="stack">
        <p className="kicker">Account</p>
        <h1 className="page-title">Start small.</h1>
        <p className="lead">
          Accounts keep your preferences, learning history, feedback, and recaps available across sessions.
        </p>
        {error ? <p className="message">{error}</p> : null}
      </section>

      <section className="auth-grid">
        <form action={submitSignUp} className="panel stack">
          <div>
            <p className="kicker">New here</p>
            <h2 className="section-title">Create an account</h2>
          </div>
          <div className="field">
            <label htmlFor="signup-name">Name</label>
            <input id="signup-name" name="name" autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="signup-email">Email</label>
            <input id="signup-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" name="password" type="password" minLength={8} autoComplete="new-password" required />
          </div>
          <button className="button-primary" type="submit" disabled={busy}>
            Create account
          </button>
        </form>

        <form action={submitSignIn} className="panel stack">
          <div>
            <p className="kicker">Welcome back</p>
            <h2 className="section-title">Sign in</h2>
          </div>
          <div className="field">
            <label htmlFor="signin-email">Email</label>
            <input id="signin-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="signin-password">Password</label>
            <input id="signin-password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button className="button-secondary" type="submit" disabled={busy}>
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
