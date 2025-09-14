import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

const Signup = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23a855f7\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      
      <div className="relative w-full max-w-md space-y-8 animate-slide-up">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary animate-pulse-glow" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Start Your Journey
          </h1>
          <p className="text-muted-foreground">
            Create your account and discover your career path
          </p>
        </div>

        <AuthForm isSignUp={true} />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:text-accent transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-16 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default Signup;