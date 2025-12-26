import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import ConditionalLayout from "./ConditionalLayout";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Complaint Management System",
  description:
    "This system is used for submitting online public issues regarding Municipal services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>

          {/* ✅ SUSPENSE FIX (VERY IMPORTANT) */}
          <Suspense fallback={<div>Loading...</div>}>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </Suspense>

        </SessionWrapper>

        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
