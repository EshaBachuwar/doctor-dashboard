import mongoose, { Schema, Document } from 'mongoose';

export interface IPrescription extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PrescriptionSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  medications: [{
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    }
  }],
  notes: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

export default mongoose.models.Prescription || mongoose.model<IPrescription>('Prescription', PrescriptionSchema);
