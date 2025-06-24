'use client';
import {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import MilestoneForm from '../components/MilestoneForm';
import MilestoneList from '../components/MilestoneList';
import { useAuth } from '../context/AuthContext';
import { getMilestones } from '../services/milestones';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [milestones, setMilestones] = useState([]);
  useEffect(() => {
    if (!user) return router.replace('/');
    getMilestones().then(setMilestones).catch(() => logout());
  }, [user]);
  return (
    <div className="p-4">
      <button onClick={logout} className="text-red-500">Logout</button>
      <h1 className="text-2xl font-bold mb-4">Your Milestones</h1>
      <MilestoneForm onSubmit={m => setMilestones([m, ...milestones])} />
      <MilestoneList milestones={milestones} />
    </div>
  );
}