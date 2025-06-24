import mongoose from 'mongoose';

const TipSchema = new mongoose.Schema(
  {
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Tip = mongoose.models.Tip || mongoose.model('Tip', TipSchema);

export default Tip;
