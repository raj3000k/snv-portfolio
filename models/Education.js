import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
export default Education;
