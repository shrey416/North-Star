// src/app/signup/page.tsx
"use client"; // <-- Step 1: Mark as a Client Component

import Link from "next/link";
import { useState } from "react"; // <-- Step 2: Import useState
import { useRouter } from "next/navigation"; // <-- Step 5: Import useRouter
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";

export default function SignupPage() {
  const router = useRouter(); // Initialize router
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- Step 3: State for error messages

  // Step 4: Function to handle form submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return; // Stop the function if fields are empty
    }

    // If validation passes
    setError(""); // Clear any previous errors
    console.log("Account created for:", { name, email });

    // Redirect to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black/[.05]">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-foreground/60">Start your personalized career journey today.</p>
        </div>
        {/* Attach the handler to the form's onSubmit event */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name} // Control the input value
              onChange={(e) => setName(e.target.value)} // Update state on change
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email} // Control the input value
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password} // Control the input value
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>

          {/* Conditionally render the error message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}