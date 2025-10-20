"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountBalance } from "./components/account-balance";

type Connection = { id: string; brokerage?: { name?: string; slug?: string }; disabled?: boolean };
type Account = { id: string; name?: string; broker?: string };

export default function StartPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const searchParams = useSearchParams();
  const linked = searchParams.get("linked") === "1";

  async function handleConnect() {
    setLoading(true);
    setError(null);
    try {
      await fetch("/api/snaptrade/register", { method: "POST" });
      const res = await fetch("/api/snaptrade/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ broker: "ROBINHOOD" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start portal session");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function loadData() {
    try {
      const [cRes, aRes] = await Promise.all([
        fetch("/api/snaptrade/connections"),
        fetch("/api/snaptrade/accounts"),
      ]);
      const c = await cRes.json();
      const a = await aRes.json();
      setConnections(c.connections ?? []);
      setAccounts(a.accounts ?? []);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadData();
    if (linked) {
      fetch("/api/complete", { method: "POST" }).catch(() => {});
    }
  }, [linked]);

  return (
    <div className="mx-auto max-w-xl p-6 space-y-4">
      <div className="flex flex-col space-y-2 items-center justify-end pb-2">
      <h1 className="text-5xl font-bold tracking-tight text-emerald-400">
        {/* Ωmega-Ȼrew */}
        {/* Ωmega-𝓒rew */}
        Ωmega-☾rew
      </h1>
      <p className="text-slate-400 mt-2">
        The endgame portfolio tracker for you and the boys.
      </p>
        {session?.user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {session.user.name ?? session.user.email}
            </span>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                 await signOut({ query: { callbackURL: "/signin" } });
                } finally {
                  router.push("/signin");
                }
              }}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => router.push("/signin")}>
            Sign in
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Link your brokerage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Connect Robinhood to share your portfolio and account data with Omega.</p>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button onClick={handleConnect} disabled={loading}>
            {loading ? "Opening Portal..." : "Connect Robinhood"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-muted-foreground">Your linked brokerages.</p>
          {connections.length === 0 ? (
            <p className="text-sm text-muted-foreground">No connections yet.</p>
          ) : (
            connections.map((c: any) => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {c.brokerage?.name ?? c.brokerage?.slug ?? "Brokerage"}
                  </div>
                  {c.disabled ? (
                    <div className="text-xs text-yellow-600">Needs reconnect</div>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-muted-foreground">Your accounts across all linked brokerages.</p>
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No accounts yet.</p>
          ) : (
            accounts.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between">
                <div className="font-medium">{a.name ?? a.id}</div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountBalance broker="ROBINHOOD" linked={linked} />
        </CardContent>
      </Card>
    </div>
  );
}