"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define paths where navbar should be hidden
  const hideNavbarOn = ["/dashboard", "/transactions"];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="en">
      <body>
        {!shouldHideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
