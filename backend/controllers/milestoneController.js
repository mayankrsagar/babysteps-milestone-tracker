import Milestone from '../models.js/Milestone.js';

export const createMilestone = async (req, res) => {
  const { title, date, notes } = req.body;
  try {
    const milestone = new Milestone({ user: req.user.id, title, date, notes });
    await milestone.save();
    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getMilestones = async (req, res) => {
  try {
    const list = await Milestone.find({ user: req.user.id }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateMilestone = async (req, res) => {
  const { title, date, notes } = req.body;
  try {
    let milestone = await Milestone.findById(req.params.id);
    if (!milestone || milestone.user.toString() !== req.user.id)
      return res.status(404).json({ msg: 'Milestone not found' });
    milestone.title = title;
    milestone.date = date;
    milestone.notes = notes;
    await milestone.save();
    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone || milestone.user.toString() !== req.user.id)
      return res.status(404).json({ msg: 'Milestone not found' });
    await milestone.remove();
    res.json({ msg: 'Milestone removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};