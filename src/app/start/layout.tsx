import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StartLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(Object.fromEntries(h.entries())),
  });
  if (!session?.user?.id) {
    redirect("/signin");
  }

  // const user = await prisma.user.findUnique({
  //   where: { id: session.user.id },
  //   select: { onboardingComplete: true },
  // });

  // if (!user?.onboardingComplete) {
  //   redirect("/signup");
  // }

  return <>{children}</>;
}