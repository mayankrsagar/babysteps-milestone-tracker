import { useState } from 'react';

import { addTip } from '../services/tips';

export default function TipForm({ milestoneId, onClose }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      await addTip(milestoneId, content);
      setContent('');
      onClose();
    } catch (error) {
      console.error('Failed to add tip:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-bold text-gray-700 mb-2">Share Your Tip</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your advice or experience..."
          className="w-full px-3 py-2 border rounded-md"
          rows="3"
          disabled={loading}
        />
        <div className="mt-2 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            disabled={loading || !content.trim()}
          >
            {loading ? 'Posting...' : 'Post Tip'}
          </button>
        </div>
      </form>
    </div>
  );
}