# 🏥 Doctors Dashboard

Doctors Dashboard is a **Next.js** application that provides a comprehensive platform for doctors to manage their patients efficiently. It includes authentication, patient management, symptom-based diagnosis prediction, and a referral system for multi-doctor collaboration.

## 🚀 Features

- **Doctor Authentication** – Secure login system for doctors.
- **Patient Management** – Add, edit, delete patient records.
- **Symptom-Based Diagnosis Prediction** – AI-powered diagnosis suggestions based on patient symptoms.
- **Multi-Doctor Collaboration** – Refer patients to specialists within the system.
- **Search Functionality** – Quickly find patients by name.
- **Prescription PDF Generator** – Generate and download patient prescriptions.
- **Dark/Light Mode** – Theme toggle for better user experience.

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **State Management:** Redux
- **Database:** MongoDB
- **Authentication:** JWT
- **Deployment:** Vercel

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/EshaBachuwar/doctor-dashboard
cd doctor-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create a `.env.local` file and add the required environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXTAUTH_SECRET=your_secret_key
```

## 🚀 Deployment

### **Deploy on Vercel**

The easiest way to deploy is using Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually deploy:

```bash
git push origin main
vercel --prod
```

## 🛠 Future Enhancements

- **Real-time Notifications** for patient referrals using WebSockets.
- **Appointment Scheduling** with calendar integration.
- **Push Notifications** using Firebase or OneSignal.

---
Made with ❤️ by [Esha Bachuwar](https://github.com/EshaBachuwar)
