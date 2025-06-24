'use client';
import {
  useEffect,
  useState,
} from 'react';

import { getTips } from '../services/tips';

export default function TipList({ milestoneId }) {
  const [tips, setTips] = useState([]);
  useEffect(() => getTips(milestoneId).then(setTips), []);
  return tips.map(t => <p key={t._id}>{t.content}</p>);
}