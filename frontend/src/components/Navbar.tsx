// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button"; // <-- Correct Path

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessments", label: "Assessments" },
  { href: "/career-paths", label: "Career Paths" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          CareerAdvisor AI
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground/80 ${
                  isActive ? "text-foreground font-semibold" : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div>
          <Link href="/">
            <Button variant="secondary">Logout</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}