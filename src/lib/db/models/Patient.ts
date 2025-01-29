import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  contact: string;
  medicalHistory: string;
  doctor: mongoose.Types.ObjectId;
  prescriptions: mongoose.Types.ObjectId[];
  reports: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
  },
  gender: {
    type: String,
    required: [true, 'Please provide gender'],
    enum: ['male', 'female', 'other'],
  },
  contact: {
    type: String,
    required: [true, 'Please provide contact information'],
  },
  medicalHistory: {
    type: String,
    default: '',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  prescriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  reports: [{
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }]
}, {
  timestamps: true
});

export default mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);
