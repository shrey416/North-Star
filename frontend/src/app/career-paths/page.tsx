// src/app/career-paths/page.tsx
import { MainLayout } from "@/components/MainLayout";
import { InteractiveStarMap } from "@/components/InteractiveStarMap";

export default function CareerPathsPage() {
  return (
    <MainLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Explore Your Career Constellations
        </h1>
        <p className="text-gray-400 mt-2">
          Navigate the star map to discover skills and careers. Click and drag to explore.
        </p>
      </div>
      <InteractiveStarMap />
    </MainLayout>
  );
}