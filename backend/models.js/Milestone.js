import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
}, { timestamps: true });

// const  Milestone=mongoose.model('Milestone', MilestoneSchema);
const Milestone = mongoose.models.Milestone || mongoose.model('Milestone', MilestoneSchema);
export default Milestone;