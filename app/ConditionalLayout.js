"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // ✅ Only show Navbar/Footer on specific routes
  const allowedPaths = ["/"];
  const showLayout = allowedPaths.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
