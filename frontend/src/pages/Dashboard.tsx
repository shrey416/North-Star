import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

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

  if (!user) {
    return null;
  }

  const userName = user.displayName || user.email || "Explorer";

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personalized career dashboard is ready to guide your next steps.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Progress */}
            <Card className="cosmic-card p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Career Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="text-primary font-semibold">85%</span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <span className="text-muted-foreground">Skills Assessment</span>
                  <span className="text-accent font-semibold">92%</span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="cosmic-card p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { action: "Completed React Developer Skills Assessment", time: "2 hours ago", type: "assessment" },
                  { action: "Updated career preferences", time: "1 day ago", type: "profile" },
                  { action: "Viewed 5 job recommendations", time: "3 days ago", type: "jobs" },
                  { action: "Connected with Sarah Chen", time: "1 week ago", type: "network" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="cosmic-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full cosmic-button justify-start">
                  🎯 Take Skill Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start border-border/50 hover:border-primary">
                  💼 Browse Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start border-border/50 hover:border-primary">
                  📚 View Learning Path
                </Button>
                <Button variant="outline" className="w-full justify-start border-border/50 hover:border-primary">
                  🌐 Expand Network
                </Button>
              </div>
            </Card>

            {/* Career Insights */}
            <Card className="cosmic-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Career Insights</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Trending Skill</h4>
                  <p className="text-sm text-muted-foreground">
                    AI/ML expertise is in high demand in your field. Consider adding this to your skillset.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h4 className="font-medium text-accent mb-2">Market Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    Senior React positions in your area have increased by 25% this quarter.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation Stats */}
            <Card className="cosmic-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Your Navigation</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Career Score</span>
                  <span className="text-2xl font-bold text-primary">8.7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Goals Achieved</span>
                  <span className="text-lg font-semibold text-accent">12/15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network Size</span>
                  <span className="text-lg font-semibold text-foreground">847</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-20 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Dashboard;