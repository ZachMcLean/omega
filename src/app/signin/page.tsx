"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await signIn.email(
        { email, password, callbackURL: "/start" },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => setLoading(false),
          onError: (ctx) => {
            setErr(ctx.error.message);
            setLoading(false);
          },
        }
      );
      if (error) setErr(error.message ?? "Sign in failed");
    } catch (e: any) {
      setErr(e.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-xl font-medium">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          disabled={loading}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="space-y-2">
        <button
          onClick={() =>
            signIn.social({ provider: "github", callbackURL: "/start" })
          }
          className="w-full rounded border px-3 py-2"
        >
          Continue with GitHub
        </button>
        <button
          onClick={() =>
            signIn.social({ provider: "google", callbackURL: "/start" })
          }
          className="w-full rounded border px-3 py-2"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}