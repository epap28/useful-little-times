import { savePreferencesAction } from "@/app/actions";
import { PreferenceGrid } from "@/components/PreferenceGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { requireUser } from "@/lib/auth";

export default async function SettingsPage({
  searchParams
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const preferred = new Set(
    user.preferences.filter((preference) => preference.status === "PREFERRED").map((preference) => preference.category.slug)
  );
  const avoided = new Set(
    user.preferences.filter((preference) => preference.status === "AVOIDED").map((preference) => preference.category.slug)
  );

  return (
    <>
      <SiteHeader user={user} />
      <main className="shell stack">
        <section className="panel stack">
          <p className="kicker">{params.welcome ? "First setup" : "Settings"}</p>
          <h1 className="page-title">Choose what feels useful.</h1>
          <p className="lead">
            Use your little waiting moments to learn one useful thing. No pressure, no overload. Recaps help your brain
            strengthen memories by revisiting what you saw.
          </p>
          <form action={savePreferencesAction} className="stack">
            <PreferenceGrid preferred={preferred} avoided={avoided} />
            <div className="spread">
              <p className="muted">Tip: choose at least 3 preferred domains so the app can keep things varied.</p>
              <button className="button-primary" type="submit">
                Save preferences
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
