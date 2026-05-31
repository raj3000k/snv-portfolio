import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  logoUrl: { type: String, default: "" },
  description: { type: String, required: true },
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
