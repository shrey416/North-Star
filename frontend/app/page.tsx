export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Find Your <span className="text-indigo-400">North Star.</span>
            <br />
            Navigate Your Career Path.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Unlock your professional potential with our AI-powered career guidance platform. We provide personalized advice, skill analysis, and a roadmap to your dream job.
          </p>
        </div>
      </div>
    </div>
  );
}