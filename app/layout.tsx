import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";

// Headings, HUD, level codes. Unreadable at paragraph length — never body.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Body copy. Pixel terminal face that stays legible in long runs, which is
// what lets the whole page read as one arcade artifact instead of a game
// skin bolted onto a normal website.
const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const title = profile.name;
const description =
  "An interactive side-scrolling portfolio: college, Amazon ML Summer School, and building AI-powered enterprise software at MAQ Software.";

/**
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deployment, so link
 * previews resolve correctly without hardcoding a domain. Swap in a custom
 * domain here once there is one.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "software engineer",
    "portfolio",
    "Dynamics 365",
    "Power Platform",
    "Semantic Kernel",
    "C#",
    ".NET",
    "machine learning",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches the arcade background, so mobile browser chrome blends in.
  themeColor: "#0f172a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
