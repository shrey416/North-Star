'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from './ui/Button';
import LogoutButton from './ui/LogoutButton';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              North-Star
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {status === 'authenticated' ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" passHref>
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/sign-up" passHref>
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}