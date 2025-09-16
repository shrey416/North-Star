// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import CareerRecommendations from '@/components/CareerRecommendations';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.displayName || user.email || "Explorer";

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative max-w-7xl mx-auto py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-primary">{userName}!</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personalized career dashboard is ready to guide your next steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CareerRecommendations />

            <Card className="cosmic-card p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Career Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Profile Completion</span><span className="text-primary font-semibold">85%</span></div>
                <div className="w-full bg-border/50 rounded-full h-2"><div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '85%' }}></div></div>
                <div className="flex items-center justify-between mt-6"><span className="text-muted-foreground">Skills Assessed</span><span className="text-accent font-semibold">4/10</span></div>
                <div className="w-full bg-border/50 rounded-full h-2"><div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{ width: '40%' }}></div></div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="cosmic-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full cosmic-button justify-start">🎯 Take Skill Assessment</Button>
                <Button variant="outline" className="w-full justify-start border-border/50 hover:border-primary">💼 Browse Jobs</Button>
                <Button variant="outline" className="w-full justify-start border-border/50 hover:border-primary" onClick={() => navigate('/profile')}>👤 Update Profile</Button>
              </div>
            </Card>

            <Card className="cosmic-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Career Insights</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Trending Skill</h4>
                  <p className="text-sm text-muted-foreground">AI/ML expertise is in high demand. Your Python skill is a great first step.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="absolute top-32 right-20 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Dashboard;