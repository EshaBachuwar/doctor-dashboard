import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface ReferredPatient {
    patient: mongoose.Types.ObjectId;
    referredBy: mongoose.Types.ObjectId;
    referredAt: Date;
}export interface IDoctor extends Document {
    name: string;
    email: string;
    password: string;
    specialization: string;
    age:Number;
    phone:string;
    patients: mongoose.Types.ObjectId[];
    referredPatients: ReferredPatient[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const ReferredPatientSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    referredBy: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    referredAt: {
        type: Date,
        default: Date.now
    }
});
const DoctorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    specialization: {
        type: String,
        required: [true, 'Please provide a specialization'],
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    referredPatients: [ReferredPatientSchema]
}, {
    timestamps: true
});

DoctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});


DoctorSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);
