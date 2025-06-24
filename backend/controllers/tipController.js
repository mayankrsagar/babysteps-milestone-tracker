import Milestone from '../models/Milestone.js';
import Tip from '../models/Tip.js';

export const addTip = async (req, res) => {
  const { content } = req.body;
  try {
    const milestone = await Milestone.findById(req.params.milestoneId);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });
    const tip = new Tip({ milestone: req.params.milestoneId, user: req.user.id, content });
    await tip.save();
    res.json(tip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getTips = async (req, res) => {
  try {
    const tips = await Tip.find({ milestone: req.params.milestoneId }).sort({ createdAt: -1 });
    res.json(tips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};