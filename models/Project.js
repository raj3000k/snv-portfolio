import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  techStack: { type: [String], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  githubUrl: { type: String, required: true },
  liveUrl: { type: String, default: "" },
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
