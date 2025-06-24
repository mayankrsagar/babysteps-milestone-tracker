import { useState } from 'react';

import TipForm from './TipForm';
import TipList from './TipList';

export default function MilestoneItem({ milestone, onUpdate, onDelete }) {
  const [showTips, setShowTips] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tipFormOpen, setTipFormOpen] = useState(false);
  const date = new Date(milestone.date).toLocaleDateString();
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      onDelete(milestone._id);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-blue-600">{milestone.title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
          {milestone.notes && <p className="mt-2 text-gray-700">{milestone.notes}</p>}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setEditing(!editing)}
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
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}