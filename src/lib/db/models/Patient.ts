import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface IPatientData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  medicalHistory: string;
  doctor: Types.ObjectId;
  email?: string;
  phone?: string;
  prescriptions: Types.ObjectId[];
  reports: Types.ObjectId[];
}

export interface IPatient extends IPatientData, Document {
  createdAt: Date;
  updatedAt: Date;
  toPatient(): object;
  addPrescription(prescriptionId: mongoose.Types.ObjectId): void;
  addReport(reportId: mongoose.Types.ObjectId): void;
}

export interface IPatientModel extends Model<IPatient> {
  findByDoctor(doctorId: mongoose.Types.ObjectId): Promise<IPatient[]>;
}

const PatientSchema = new Schema<IPatient>({
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
  email: {
      type: String,
      trim: true,
  },
  phone: {
      type: String,
      trim: true,
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

PatientSchema.methods.toPatient = function() {
  return {
      id: this._id.toString(),
      name: this.name,
      age: this.age,
      gender: this.gender,
      contact: this.contact,
      email: this.email,
      phone: this.phone,
      medicalHistory: this.medicalHistory,
      doctor: this.doctor.toString(),
      prescriptions: this.prescriptions.map((id: mongoose.Types.ObjectId) => id.toString()),
      reports: this.reports.map((id: mongoose.Types.ObjectId) => id.toString()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
  };
};

PatientSchema.methods.addPrescription = function(prescriptionId: mongoose.Types.ObjectId) {
  if (!this.prescriptions.includes(prescriptionId)) {
      this.prescriptions.push(prescriptionId);
  }
};

PatientSchema.methods.addReport = function(reportId: mongoose.Types.ObjectId) {
  if (!this.reports.includes(reportId)) {
      this.reports.push(reportId);
  }
};

PatientSchema.statics.findByDoctor = function(doctorId: mongoose.Types.ObjectId) {
  return this.find({ doctor: doctorId });
};

export default mongoose.models.Patient as IPatientModel || mongoose.model<IPatient, IPatientModel>('Patient', PatientSchema);
