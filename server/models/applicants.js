import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
      trim: true,
    },
    comments: {
      default: '',
      type: String,
      trim: true,
    },
    status: { type: String, default: 'Applied' },
  },
  { collection: 'Applicants' }
);

const Applicants = mongoose.model('Applicants', ApplicantSchema);

export default Applicants;
