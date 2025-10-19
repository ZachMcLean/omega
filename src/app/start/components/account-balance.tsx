"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BalanceResponse = {
  broker: string;
  total: number;
  currency: string;
  accounts: any[];
};

export function AccountBalance({
  broker = "ROBINHOOD",
  linked = false,
}: {
  broker?: string;
  linked?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BalanceResponse | null>(null);
  const [syncing, setSyncing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function fetchBalance(signal?: AbortSignal): Promise<BalanceResponse | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/snaptrade/balance?broker=${encodeURIComponent(broker)}`, { signal });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error ?? "Failed to load balance");
      }
      setData(json as BalanceResponse);
      return json as BalanceResponse;
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setError(e?.message ?? "Failed to load balance");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let cancelled = false;
    const run = async () => {
      const first = await fetchBalance(ctrl.signal);
      // After linking, balances can take a moment to populate. Retry briefly.
      if (linked && !cancelled) {
        const isStale =
          !first ||
          !Array.isArray(first.accounts) ||
          first.accounts.length === 0 ||
          (typeof first.total === "number" && first.total === 0);

        if (isStale) {
          setSyncing(true);
          try {
            for (let i = 0; i < 4 && !cancelled; i++) {
              await new Promise((r) => setTimeout(r, 1500));
              const next = await fetchBalance(ctrl.signal);
              if (
                next &&
                Array.isArray(next.accounts) &&
                (next.accounts.length > 0 || (typeof next.total === "number" && next.total > 0))
              ) {
                break;
              }
            }
          } finally {
            if (!cancelled) setSyncing(false);
          }
        }
      }
    };

    run();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [broker, linked]);

  const formatted = useMemo(() => {
    if (data?.total != null && data?.currency) {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: data.currency }).format(data.total);
    }
    return null;
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle>Account Balance {data?.broker ? `(${data.broker})` : ""}</CardTitle>
        <Button variant="outline" size="sm" onClick={() => fetchBalance()} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!error && (loading || syncing) ? (
          <p className="text-sm text-muted-foreground">
            {syncing ? "Syncing latest balance… this can take a few seconds after linking." : "Loading balance…"}
          </p>
        ) : null}
        {!error && !loading && formatted ? <div className="text-2xl font-semibold">{formatted}</div> : null}
        {!error && !loading && !formatted ? (
          <p className="text-sm text-muted-foreground">No balance available. Make sure your brokerage is linked.</p>
        ) : null}
      </CardContent>
    </Card>
  );
}