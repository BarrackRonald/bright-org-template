import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findFirst();

  return {
    title: settings?.title || "BrightOrg",
    description:
      settings?.tagline ||
      "Empowering youth through education, empowerment, and climate action",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <Navbar siteTitle={settings?.title || "BrightOrg"} logoUrl={settings?.logoUrl} />
        <main>{children}</main>
        <Footer
          tagline={settings?.tagline || ""}
          email={settings?.contactEmail || ""}
          phone={settings?.contactPhone || ""}
          address={settings?.address || ""}
        />
      </body>
    </html>
  );
}
