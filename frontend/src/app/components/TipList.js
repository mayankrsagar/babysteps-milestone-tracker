'use client';
import {
  useEffect,
  useState,
} from 'react';

import { getTips } from '../services/tips';

export default function TipList({ milestoneId }) {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    async function loadTips() {
      try {
        const data = await getTips(milestoneId);
        setTips(data);
      } catch (err) {
        console.error('Failed to load tips:', err);
      }
    }
    loadTips();
  }, [milestoneId]);

  return (
    <>
      {tips.map(t => (
        <p key={t._id}>{t.content}</p>
      ))}
    </>
  );
}
