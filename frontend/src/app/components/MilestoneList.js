'use client';
import MilestoneItem from './MilestoneItem';

export default function MilestoneList({ milestones }) {
  return milestones.map(m => <MilestoneItem key={m._id} milestone={m} />);
}