"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** =========================
 *  Root Page
 *  ========================= */
export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Header appName="GainGang" />

        {/* KPIs */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Total Equity" value="$123,456.78" sub="As of now" />
          <KpiCard title="Today" value="+2.34%" sub="+$2,345.67" accent />
          <KpiCard title="Buying Power" value="$9,876.54" sub="Cash + margin" />
          <KpiCard title="Cash" value="$4,321.00" sub="Settled" />
        </section>

        {/* Margin + Day Trades */}
        <section className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Section title="Margin">
            <KeyValueGrid>
              <KeyValue k="Available" v="$5,000.00" />
              <KeyValue k="Used" v="$3,200.00" />
              <KeyValue k="Maintenance Req." v="$2,750.00" />
              <KeyValue k="Leverage" v="1.4×" />
            </KeyValueGrid>
            <p className="mt-2 text-sm text-muted-foreground">
              Heads-up: falling below maintenance can trigger a margin call.
            </p>
          </Section>

          <Section title="Day Trades">
            <KeyValueGrid>
              <KeyValue k="Past 5 Biz Days" v="2" />
              <KeyValue k="PDT Threshold" v="≥ 4" />
              <KeyValue k="Status" v="Safe" />
              <KeyValue k="Acct Type" v="Margin" />
            </KeyValueGrid>
            <p className="mt-2 text-sm text-muted-foreground">
              A “day trade” is a buy & sell of the same symbol on the same day.
            </p>
          </Section>
        </section>

        {/* Positions */}
        <section className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Section title="Stock Positions">
            <PositionsTable
              columns={[
                "Symbol",
                "Qty",
                "Avg Cost",
                "Price",
                "Market Value",
                "Unrealized P&L",
              ]}
              rows={[
                ["AAPL", "20", "$165.00", "$178.45", "$3,569.00", "+$268.95 (8.1%)"],
                ["NVDA", "5", "$650.00", "$820.12", "$4,100.60", "+$850.60 (26.2%)"],
                ["LTBR", "3200", "$10.75", "$23.37", "$74,784.00", "+$40,000+ (est)"],
              ]}
            />
          </Section>

          <Section title="Crypto Positions">
            <PositionsTable
              columns={[
                "Asset",
                "Qty",
                "Avg Cost",
                "Price",
                "Market Value",
                "Unrealized P&L",
              ]}
              rows={[
                ["BTC", "0.25", "$58,000", "$62,300", "$15,575", "+$1,075 (7.4%)"],
                ["ETH", "3.0", "$2,800", "$3,150", "$9,450", "+$1,050 (12.5%)"],
              ]}
            />
          </Section>
        </section>

        {/* Leaderboard */}
        <section className="mt-4">
          <Section title="The Gang · Today’s Movers">
            <Leaderboard
              entries={[
                { name: "Zach", change: "+3.8%" },
                { name: "Aiden", change: "+2.1%" },
                { name: "Noah", change: "-0.6%" },
              ]}
            />
          </Section>
        </section>
      </div>
    </main>
  );
}

/** =========================
 *  Components (in-file)
 *  ========================= */

function Header({ appName }: { appName: string }) {
  return (
    <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📈</span>
        <h1 className="text-xl font-bold tracking-tight">{appName}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search ticker or friend…"
          aria-label="Search"
          className="min-w-[240px] border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
        />
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Invite Friends
        </Button>
      </div>
    </header>
  );
}

function KpiCard({
  title,
  value,
  sub,
  accent,
}: {
  title: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <Card className={["bg-card border-border", accent ? "ring-1 ring-inset ring-gain/50" : ""].join(" ")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <CardDescription className="sr-only">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
      </CardContent>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function KeyValueGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>;
}

function KeyValue({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-3 py-2">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className="text-sm font-semibold">{v}</span>
    </div>
  );
}

function PositionsTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              {columns.map((c) => (
                <TableHead key={c} className="whitespace-nowrap text-muted-foreground">
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} className="border-border">
                {r.map((cell, j) => (
                  <TableCell key={j} className="whitespace-nowrap">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Leaderboard({
  entries,
}: {
  entries: { name: string; change: string }[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((e) => {
        const isNeg = e.change.trim().startsWith("-");
        return (
          <li
            key={e.name}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"
          >
            <span className="font-medium">{e.name}</span>
            <span className={["font-semibold", isNeg ? "text-loss" : "text-gain"].join(" ")}>
              {e.change}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
