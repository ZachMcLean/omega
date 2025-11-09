"use client";

import { redirect } from "next/navigation";

/** =========================
 *  Root Page - Redirect to Portfolio
 *  ========================= */
export default function Page() {
  redirect("/portfolio");
}
