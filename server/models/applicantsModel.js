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
      type: Array,
      trim: true,
    },
    status: {
      title: { required: true, type: String, default: 'Applied' },
      order: { required: true, type: Number, default: 0 },
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'Applicants' }
);

const Applicants = mongoose.model('Applicants', ApplicantSchema);

export default Applicants;
