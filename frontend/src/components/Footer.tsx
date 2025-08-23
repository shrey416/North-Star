// src/components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <div className="container mx-auto py-6 text-center text-sm text-foreground/60">
        <p>&copy; {new Date().getFullYear()} CareerAdvisor AI. All Rights Reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}