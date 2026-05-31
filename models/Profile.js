import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true }
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Raj Motwani" },
  title: { type: String, required: true, default: "Software Developer" },
  bio: { type: String, required: true, default: "I'm an enthusiastic geek and a Software Developer..." },
  profilePicUrl: { type: String, default: "" },
  resumeUrl: { type: String, default: "" },
  email: { type: String, default: "rajmotwani38@gmail.com" },
  github: { type: String, default: "https://github.com/raj3000k/" },
  linkedin: { type: String, default: "https://www.linkedin.com/in/raj-motwani-978143204/" },
  twitter: { type: String, default: "https://x.com/RAJMOTWANI16" },
  availability: { type: Boolean, default: true },
  skills: [skillSchema]
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
