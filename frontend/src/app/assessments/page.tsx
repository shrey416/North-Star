// src/app/assessments/page.tsx
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { MainLayout } from "@/components/MainLayout";
import { CheckCircle } from "lucide-react";

export default function AssessmentsPage() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">My Assessments</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Available Assessments</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Psychometric Test</h3>
            <p className="text-foreground/70 mb-4">Discover your personality traits and work style preferences. (Est. 20 mins)</p>
            <Button>Start Now</Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Aptitude Test</h3>
            <p className="text-foreground/70 mb-4">Measure your problem-solving and logical reasoning skills. (Est. 45 mins)</p>
            <Button>Start Now</Button>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Completed Assessments</h2>
        <div className="space-y-4">
          <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500"/>
                <div>
                  <h4 className="font-semibold">Technical Skills Assessment - Python</h4>
                  <p className="text-sm text-foreground/60">Completed on: 15 Aug, 2025</p>
                </div>
              </div>
              <Button variant="secondary">View Results</Button>
            </Card>
        </div>
      </div>
    </MainLayout>
  );
}