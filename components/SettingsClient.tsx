"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PreferenceGrid } from "@/components/PreferenceGrid";
import { getMe, getToken, savePreferences } from "@/lib/api-client";
import type { User } from "@/lib/domain";

export function SettingsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
      return;
    }
    getMe()
      .then(({ user: loadedUser }) => setUser(loadedUser))
      .catch((caught) => setError(caught instanceof Error ? caught.message : "Could not load settings."));
  }, [router]);

  const preferred = useMemo(
    () => new Set(user?.preferences.filter((preference) => preference.status === "PREFERRED").map((preference) => preference.category.slug)),
    [user]
  );
  const avoided = useMemo(
    () => new Set(user?.preferences.filter((preference) => preference.status === "AVOIDED").map((preference) => preference.category.slug)),
    [user]
  );

  async function submit(formData: FormData) {
    setError(null);
    setBusy(true);
    try {
      await savePreferences({
        preferred: formData.getAll("preferred").map(String),
        avoided: formData.getAll("avoided").map(String)
      });
      router.push("/dashboard");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save preferences.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell stack">
      <section className="panel stack">
        <p className="kicker">{searchParams.get("welcome") ? "First setup" : "Settings"}</p>
        <h1 className="page-title">Choose what feels useful.</h1>
        <p className="lead">
          Use your little waiting moments to learn one useful thing. No pressure, no overload. Recaps help your brain
          strengthen memories by revisiting what you saw.
        </p>
        {error ? <p className="message">{error}</p> : null}
        <form action={submit} className="stack">
          <PreferenceGrid preferred={preferred} avoided={avoided} />
          <div className="spread">
            <p className="muted">Tip: choose at least 3 preferred domains so the app can keep things varied.</p>
            <button className="button-primary" type="submit" disabled={busy}>
              Save preferences
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
