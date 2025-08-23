// src/components/MainLayout.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 sm:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}