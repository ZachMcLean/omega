"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient(); // same-origin, default /api/auth - Add baseUrl if that changes
export const { useSession, signIn, signUp, signOut } = authClient;