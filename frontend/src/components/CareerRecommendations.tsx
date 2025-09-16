// frontend/src/components/CareerRecommendations.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// This would be the structure of the data from GET /api/careers/recommendations
type Recommendation = {
  id: number;
  title: string;
  match: number;
  reason: string;
};

const CareerRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with authenticatedFetch('/careers/recommendations')
    const fetchRecommendations = async () => {
        setIsLoading(true);
        await new Promise(res => setTimeout(res, 1000)); // Simulate API call
        setRecommendations([
            { id: 1, title: "AI/ML Engineer", match: 92, reason: "Strong match for your Python and Data Analysis skills." },
            { id: 2, title: "Frontend Developer", match: 88, reason: "Excellent fit for your interest in UI/UX and verified React skill." },
            { id: 3, title: "Product Manager", match: 75, reason: "Based on your Project Management skill and Communication." },
        ]);
        setIsLoading(false);
    };
    fetchRecommendations();
  }, [])

  return (
    <Card className="cosmic-card p-6 aurora-bg">
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Top Career Recommendations</h2>
      <p className="text-muted-foreground mb-6">
        Based on your profile, here are some paths that align with your journey.
      </p>
      <div className="space-y-4">
        {isLoading ? (
            <div className="text-center p-8 text-muted-foreground">Calculating your career matches...</div>
        ) : recommendations.map(rec => (
          <div key={rec.id} className="p-4 rounded-lg bg-background/60 border border-border/40 flex items-center gap-4 hover:border-primary transition-colors duration-300">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl font-bold text-primary-foreground">{rec.match}%</span>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-foreground">{rec.title}</h3>
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
            </div>
            {/* This link will eventually go to a dynamic roadmap page */}
            <Link to={`/roadmaps/${rec.id}`}> 
              <Button variant="outline" size="sm">
                View Roadmap <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CareerRecommendations;