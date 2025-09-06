import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome back, {session.user?.name || session.user?.email}!
                </h2>
                <p className="text-gray-600">
                  This is your personal career dashboard. Here you will find insights, track your progress, and get personalized recommendations to guide you toward your career goals.
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700">Your JWT Access Token:</h3>
                  <p className="text-sm text-gray-500 break-all mt-2 font-mono">
                    {session.accessToken ? session.accessToken : 'No token found.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}