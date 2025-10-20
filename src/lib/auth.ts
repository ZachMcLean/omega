import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  // Configure providers/flows you want (email/password, passkeys, OAuth, etc.)
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendVerificationEmail: true,
  },
  // Called when a verification email needs to be sent
  emailVerification: {
    // BetterAuth passes you the verify URL (including token)
    async sendVerificationEmail({ user, url, }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Verify your email by clicking this link: ${url}`,
        html: `<p>Verify your email by clicking <a href="${url}">this link</a>.</p>`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});