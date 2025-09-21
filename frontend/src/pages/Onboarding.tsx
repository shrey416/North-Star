// src/pages/Onboarding.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'; // <-- IMPORT

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticatedFetch = useAuthenticatedFetch(); // <-- USE THE HOOK
  
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "You must be logged in.", variant: "destructive" });
      return;
    }

    if (!age || !dob) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // --- UPDATED LOGIC ---
      const profileData = {
        age: parseInt(age, 10),
        dob,
      };

      await authenticatedFetch('/profile/me', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      // --- END UPDATED LOGIC ---

      toast({ title: "Information saved successfully!" });
      navigate('/profile'); // Go to profile to continue setup
    } catch (error: any) {
      toast({ 
        title: "Failed to save information.",
        description: error.message,
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Just a few more details</h1>
          <p className="text-muted-foreground">This will help us personalize your journey.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              id="dob" 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save and Continue to Profile"}
          </Button>
        </form>
        
        <Button variant="ghost" className="w-full" onClick={handleSkip}>
          Skip for Now
        </Button>
      </Card>
    </div>
  );
};

export default Onboarding;