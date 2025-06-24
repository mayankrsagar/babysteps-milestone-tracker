'use client';
import { useState } from 'react';

import {
  deleteMilestone,
  updateMilestone,
} from '../services/milestones';
import TipForm from './TipForm';
import TipList from './TipList';

export default function MilestoneItem({ milestone, refreshMilestones }) {
  const [showTips, setShowTips] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tipFormOpen, setTipFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: milestone.title,
    date: milestone.date.slice(0, 10),
    notes: milestone.notes || '',
  });

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      await deleteMilestone(milestone._id);
      refreshMilestones();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateMilestone(milestone._id, formData);
    setEditing(false);
    refreshMilestones();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div className="w-full">
          {editing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-blue-600">{milestone.title}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(milestone.date).toLocaleDateString()}
              </p>
              {milestone.notes && <p className="mt-2 text-gray-700">{milestone.notes}</p>}
            </>
          )}
        </div>

        {!editing && (
          <div className="flex flex-col items-end space-y-1 ml-4">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowTips(!showTips)}
          className="text-sm text-purple-600 hover:text-purple-800"
        >
          {showTips ? 'Hide Tips' : 'Show Community Tips'}
        </button>

        {showTips && (
          <div className="mt-2">
            <TipList milestoneId={milestone._id} />
            <button
              onClick={() => setTipFormOpen(true)}
              className="mt-2 text-sm bg-purple-500 hover:bg-purple-700 text-white py-1 px-3 rounded"
            >
              Add Tip
            </button>
            {tipFormOpen && (
              <TipForm
                milestoneId={milestone._id}
                onClose={() => setTipFormOpen(false)}
                onAdded={refreshMilestones}
              />
            )}
          </div>
        )}
      </div>
    </div>
);
}
