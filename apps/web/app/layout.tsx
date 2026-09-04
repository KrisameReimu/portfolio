import type {Metadata} from "next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {createMetadata} from "../lib/metadata";
import "./globals.scss";

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
