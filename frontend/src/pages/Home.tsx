import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import SplitText from '@/components/ui/SplitText';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23a855f7\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <SplitText
                text="Find Your North Star"
                className="text-purple-600 from-primary via-accent to-primary bg-clip-text text-transparent text-center"
                delay={100}
                duration={0.4}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, x: 40 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              {/* <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
                North Star
              </span> */}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8">
              Navigate Your Career Path
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Unlock your professional potential with our AI-powered career guidance platform. 
              We provide personalized advice, skill analysis, and a roadmap to your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="cosmic-button text-lg px-8 py-4">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="cosmic-button text-lg px-8 py-4">
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-border/50 hover:border-primary">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Your Career <span className="text-primary">Navigation System</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the tools and insights you need to chart your professional course
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Insights",
                description: "Get personalized career recommendations based on your skills, interests, and market trends.",
                icon: "🤖",
              },
              {
                title: "Skill Assessment",
                description: "Comprehensive analysis of your current abilities and identification of growth areas.",
                icon: "📊",
              },
              {
                title: "Career Roadmaps",
                description: "Step-by-step guidance to reach your professional goals with clear milestones.",
                icon: "🗺️",
              },
              {
                title: "Market Intelligence",
                description: "Real-time data on job markets, salary trends, and industry opportunities.",
                icon: "📈",
              },
              {
                title: "Learning Paths",
                description: "Curated courses and resources to develop the skills you need for success.",
                icon: "🎓",
              },
              {
                title: "Networking Hub",
                description: "Connect with professionals in your field and expand your network.",
                icon: "🌐",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="cosmic-card p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="cosmic-card p-12 aurora-bg">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Direction?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have discovered their career path with North Star
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="cosmic-button text-lg px-12 py-4">
                  Continue Your Journey
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="cosmic-button text-lg px-12 py-4">
                  Begin Your Journey Today
                </Button>
              </Link>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;