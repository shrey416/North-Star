// src/app/dashboard/page.tsx
"use client";

import { MainLayout } from "@/components/MainLayout";
import { ArrowRight, CheckCircle, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

// Reusable Dashboard Card with glowing border
const DashboardCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`
    bg-white/5 backdrop-blur-lg rounded-2xl p-6
    border border-cyan-400/20
    shadow-lg shadow-cyan-500/10 ${className}
  `}>
    {children}
  </div>
);

export default function DashboardPage() {
  const user = { name: "Aarav" };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <MainLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400">Here's a summary of your cosmic journey.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          <DashboardCard>
            <h3 className="font-semibold text-lg mb-2 text-cyan-300">Profile Completion</h3>
            <div className="w-full bg-gray-700/50 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">A complete profile attracts better constellations.</p>
          </DashboardCard>
          <DashboardCard>
            <h3 className="font-semibold text-lg mb-2 text-cyan-300">Pending Assessments</h3>
            <p className="text-sm text-gray-400 mb-4">You have 2 new deep space scans available.</p>
            <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
              Start Scan <ArrowRight className="w-4 h-4"/>
            </button>
          </DashboardCard>
          <DashboardCard>
            <h3 className="font-semibold text-lg mb-2 text-cyan-300">Recommended Careers</h3>
            <p className="text-sm text-gray-400 mb-4">5 new career constellations discovered.</p>
            <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
              Explore Paths <ArrowRight className="w-4 h-4"/>
            </button>
          </DashboardCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Your Next Steps</h2>
          <div className="space-y-4">
            <DashboardCard className="flex items-center justify-between hover:border-cyan-400/50 transition-all">
              <div className="flex items-center gap-4">
                <BrainCircuit className="w-8 h-8 text-cyan-400" />
                <div>
                  <h4 className="font-semibold">Complete "Cognitive Aptitude Test"</h4>
                  <p className="text-sm text-gray-400">Estimated duration: 45 minutes</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-cyan-400">Begin</button>
            </DashboardCard>
            <DashboardCard className="flex items-center justify-between hover:border-cyan-400/50 transition-all">
               <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-fuchsia-400" />
                <div>
                  <h4 className="font-semibold">Review "AI Ethics Specialist" Path</h4>
                  <p className="text-sm text-gray-400">New skill nodes and learning modules added.</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-cyan-400">View</button>
            </DashboardCard>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}