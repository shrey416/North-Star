'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { FcGoogle } from 'react-icons/fc';

interface AuthFormProps {
  isSignUp: boolean;
}

export default function AuthForm({ isSignUp }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // After successful sign-up, sign in the user to create a session
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.ok) {
          router.push('/dashboard');
        } else {
          setError(result?.error || 'Failed to sign in after sign-up.');
        }
      } catch (err: any) {
        setError(err.message);
      }
    } else { // Login
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full">
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      </form>
      <div className="relative">
          <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
      </div>
      <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
        <FcGoogle className="mr-2 h-5 w-5" />
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </Button>
    </div>
  );
}