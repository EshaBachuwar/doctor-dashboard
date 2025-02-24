import mongoose, { Schema, Document, Types, Model } from "mongoose";
interface IMedicationTiming {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}
interface IMedication {
  name: string;
  timing: IMedicationTiming;
}
export interface IReport {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId | string | undefined;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
}
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
  prescribedMedication?: IMedication[];
  nextVisit?: string;
  doctor?: Types.ObjectId;
  reports?: IReport[];
}

export interface IPatient extends IPatientData, Document {
  createdAt: Date;
  updatedAt: Date;
  toPatient(): object;
  addReport(report: IReport): void;
}

export interface IPatientModel extends Model<IPatient> {
  findByDoctor(doctorId: mongoose.Types.ObjectId): Promise<IPatient[]>;
}
const MedicationTimingSchema = new Schema<IMedicationTiming>(
  {
    morning: {
      type: Boolean,
      default: false,
    },
    afternoon: {
      type: Boolean,
      default: false,
    },
    night: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);
const MedicationSchema = new Schema<IMedication>(
  {
    name: {
      type: String,
      required: [true, "Please provide medication name"],
      trim: true,
    },
    timing: {
      type: MedicationTimingSchema,
      required: [true, "Please provide medication timing"],
    },
  },
  { _id: false }
);
const ReportSchema = new Schema<IReport>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    fileName: {
      type: String,
      required: [true, "Please provide a file name"],
    },
    fileUrl: {
      type: String,
      required: [true, "Please provide a file url"],
    },
  },
  { timestamps: true, _id: false }
);

const PatientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Please provide age"],
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
      enum: ["male", "female", "other"],
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
      default: "",
    },
    medicalHistory: {
      type: String,
      default: "",
    },
    currentMedication: {
      type: String,
      default: "",
    },
    reasonOfVisit: {
      type: String,
      default: "",
    },
    symptoms: {
      type: String,
      default: "",
    },
    diagnosis: {
      type: String,
      default: "",
    },
    prescribedMedication: {
      type: [MedicationSchema],
      default: [],
    },
    nextVisit: {
      type: String,
      default: "",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    reports: [
      {
        type: [ReportSchema],
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

PatientSchema.methods.toPatient = function () {
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
    reports: this.reports,
    createdAt: this.createdAt.toISOString(),
    updatedAt: this.updatedAt.toISOString(),
  };
};

PatientSchema.methods.addReport = function (report: IReport) {
  if (!this.reports) {
    this.reports = [];
  }
  this.reports.push(report);
};

PatientSchema.statics.findByDoctor = function (
  doctorId: mongoose.Types.ObjectId
) {
  return this.find({ doctor: doctorId });
};

export default (mongoose.models.Patient as IPatientModel) ||
  mongoose.model<IPatient, IPatientModel>("Patient", PatientSchema);
