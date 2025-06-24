'use client';
import {
  useEffect,
  useState,
} from 'react';

import LoginForm from './components/LoginForm';
import MilestoneForm from './components/MilestoneForm';
import MilestoneList from './components/MilestoneList';
import { useAuth } from './context/AuthContext';
import {
  createMilestone,
  getMilestones,
} from './services/milestones';

export default function Home() {
  const { user, loading } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState(12);

  useEffect(() => {
    if (user) {
      fetchMilestones();
    }
  }, [user]);

  const fetchMilestones = async () => {
    try {
      const data = await getMilestones();
      setMilestones(data);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  const handleCreateMilestone = async (milestoneData) => {
    try {
      await createMilestone(milestoneData);
      fetchMilestones();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating milestone:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoginForm />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Milestone Tracker</h1>
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-blue-700 font-medium">
              Week {pregnancyWeek} of Pregnancy
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
          <p className="text-gray-700">
            Based on your current pregnancy week, we recommend focusing on prenatal nutrition 
            and gentle exercises. Remember to schedule your next prenatal appointment!
          </p>
        </div>

        {showForm ? (
          <MilestoneForm onSubmit={handleCreateMilestone} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            + Add New Milestone
          </button>
        )}

        {milestones.length > 0 ? (
          <MilestoneList 
            milestones={milestones} 
            refreshMilestones={fetchMilestones} 
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No milestones yet</h2>
            <p className="text-gray-600 mb-4">
              Start your journey by adding your first milestone!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add First Milestone
            </button>
          </div>
        )}
      </div>
    </main>
  );
}