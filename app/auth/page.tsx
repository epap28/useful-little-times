import { signInAction, signUpAction } from "@/app/actions";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = params.error ? decodeURIComponent(params.error) : null;

  return (
    <>
      <SiteHeader user={null} />
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
          <form action={signUpAction} className="panel stack">
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
            <button className="button-primary" type="submit">
              Create account
            </button>
          </form>

          <form action={signInAction} className="panel stack">
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
            <button className="button-secondary" type="submit">
              Sign in
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
