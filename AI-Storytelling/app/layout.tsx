import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const nunitoFont = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <ClerkProvider>
          <Provider>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}