// src/app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, BarChart, Target } from "lucide-react";

// Reusable Neon Button
const NeonButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Link href={href}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-full relative bg-slate-900 text-white text-lg font-semibold
                 transition-all duration-300
                 border-2 border-cyan-400
                 shadow-[0_0_10px_0_#06b6d4,inset_0_0_10px_0_#06b6d4]
                 hover:shadow-[0_0_20px_0_#06b6d4,inset_0_0_20px_0_#06b6d4]"
    >
      {children}
    </motion.button>
  </Link>
);

// Glassmorphism Card for Features
const FeatureCard = ({ icon, title, children, delay }: { icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center text-center"
  >
    <div className="mb-4 text-cyan-400">{icon}</div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </motion.div>
);


export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-indigo-950 to-black overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="container mx-auto flex justify-between items-center rounded-2xl p-4
                        backdrop-blur-xl bg-white/5 border border-white/10"
        >
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            North Star
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Login
            </Link>
            <NeonButton href="/signup">Get Started</NeonButton>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-48">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center flex flex-col items-center py-20"
        >
          <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            Chart Your Career Constellation
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto text-xl text-gray-300 my-8"
          >
            North Star is your personal AI navigator, illuminating the skills and career paths that align with your unique potential in the vast universe of possibilities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <NeonButton href="/signup">Discover Your Path</NeonButton>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard title="Personalized Roadmaps" icon={<Compass size={48} />} delay={0.2}>
                    Navigate your future with AI-generated career constellations tailored to your unique skills and aspirations.
                </FeatureCard>
                <FeatureCard title="Skill Gap Analysis" icon={<BarChart size={48} />} delay={0.4}>
                    Identify the missing stars in your skillset and get precise recommendations for courses to bridge the gap.
                </FeatureCard>
                 <FeatureCard title="Market Insights" icon={<Target size={48} />} delay={0.6}>
                    Stay ahead of cosmic shifts with real-time data on emerging job roles and in-demand technologies.
                </FeatureCard>
            </div>
        </section>
      </main>
    </div>
  );
}