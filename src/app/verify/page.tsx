"use client";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const email = params.get("email");
  return (
    <main className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-xl font-medium">Check your email</h1>
      <p>We sent a verification link to {email ?? "your email"}. Open it to finish setting up your account.</p>
      <p className="text-sm text-gray-600">Didn’t get it? Check spam, or wait a moment and try again.</p>
    </main>
  );
}