import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface IPatientData {
  name: string;
  age: number;
  gender: string;
  phone?: string;
  weight?: number;
  bloodGroup?: string;
  knownAllergies?: string;
  medicalHistory?: string;
  currentMedication?: string;
  reasonOfVisit?: string;
  symptoms?: string;
  diagnosis?: string;
  prescribedMedication?: string;
  nextVisit?: string;
  doctor?: Types.ObjectId;
  prescriptions?: Types.ObjectId[];
  reports?: Types.ObjectId[];
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
  phone: {
      type: String,
      trim: true,
  },
  weight: {
      type: Number,
  },
  bloodGroup: {
      type: String,
  },
  knownAllergies: {
      type: String,
      default: '',
  },
  medicalHistory: {
      type: String,
      default: '',
  },
  currentMedication: {
      type: String,
      default: '',
  },
  reasonOfVisit: {
      type: String,
      default: '',
  },
  symptoms: {
      type: String,
      default: '',
  },
  diagnosis: {
      type: String,
      default: '',
  },
  prescribedMedication: {
      type: String,
      default: '',
  },
  nextVisit: {
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
      phone: this.phone,
      weight: this.weight,
      bloodGroup: this.bloodGroup,
      knownAllergies: this.knownAllergies,
      medicalHistory: this.medicalHistory,
      currentMedication: this.currentMedication,
      reasonOfVisit: this.reasonOfVisit,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      prescribedMedication: this.prescribedMedication,
      nextVisit: this.nextVisit,
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
