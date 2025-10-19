"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client"; // you already export these

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const { error } = await signUp.email(
      {
        email,
        password,
        name,
        image: image || undefined,
        callbackURL: "/start", // or your verify page if autoSignIn=false
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          // If autoSignIn=true, user is logged in and redirected by callbackURL.
          // If autoSignIn=false, show a “check your email” message or redirect.
          setLoading(false);
          router.push("/start");
        },
        onError: (ctx) => {
          setErr(ctx.error.message);
          setLoading(false);
          console.error(ctx.error);
        },
      }
    );
  }

  return (
    <main className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-xl font-medium">Create your account</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="url"
          placeholder="Avatar image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
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
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button disabled={loading} className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-50">
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="space-y-2">
        <button
          onClick={() => signIn.social({ provider: "github", callbackURL: "/start" })}
          className="w-full rounded border px-3 py-2"
        >
          Continue with GitHub
        </button>
        <button
          onClick={() => signIn.social({ provider: "google", callbackURL: "/start" })}
          className="w-full rounded border px-3 py-2"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}