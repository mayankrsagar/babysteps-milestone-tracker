'use client';

import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your Milestone Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <section className="text-center">
        <p className="text-gray-600 text-lg mb-6">
          This space is designed to help you track key moments during your pregnancy journey —
          from your first ultrasound to heartfelt milestones like hearing the baby’s heartbeat.
        </p>
        <div className="bg-purple-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Why use the tracker?</h2>
          <ul className="text-left text-gray-700 list-disc list-inside space-y-1">
            <li>Capture meaningful milestones with dates and notes</li>
            <li>See insights tailored to your stage of pregnancy</li>
            <li>Read tips contributed by other expecting parents</li>
            <li>Celebrate the small (and big!) wins along the way</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
