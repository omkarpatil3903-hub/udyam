# Udyam Registration Portal

This repository contains the source code for the Udyam Registration Portal, a web application designed to facilitate various services related to MSME Udyam Registration. The portal allows users to apply for new registrations, re-registrations, update certificates, and print certificates, featuring integrated payment gateways and a dedicated admin panel.

## Features

- **Registration Services**: Guided forms supporting Udyam Registration, Re-registration, Updating Certificates, and Printing Certificates.
- **Payment Integration**: Secure and seamless transaction handling implemented via the Cashfree JS SDK.
- **Admin Dashboard**: A secure module for administrators to securely log in, monitor applications, track payment statuses, and manage records.
- **Reliable Backend**: Employs Firebase Authentication for secure admin access and Firestore for storing applicant records.
- **Serverless Automation**: Utilizes Firebase Cloud Functions back-end to securely initialize and verify payment processes without exposing private keys.
- **Responsive Aesthetics**: A beautiful, user-friendly, and mobile-responsive interface styled meticulously with Tailwind CSS.

## Technology Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (v7)
- **Database & Auth**: Firebase v12 (Firestore Data & Firebase Auth)
- **Payment Gateway**: Cashfree Payments JS SDK
- **Backend / Webhooks**: Node.js & Firebase Cloud Functions

## Project Structure

- `src/components/`: Reusable interface components including forms and informational page sections.
- `src/pages/`: Primary views including Registrations, Re-registrations, Admin Dashboard, etc.
- `src/services/`: Service integrations such as the `paymentService` module for standardizing Cashfree integration.
- `src/data/`: Static configurations and assets like states and districts mappings.
- `functions/`: Serverless node environment running Firebase functions for server-side logic and payment verifications.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Active Firebase Project (with Firestore and Authentication enabled)
- Cashfree Merchant Credentials

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd udyam
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```

4. **Environment Variables:**
   Create a `.env` file in the root directory containing your Firebase credentials.
   (Similarly, create a `.env` in the `functions/` folder for Cashfree API credentials.)
   
5. **Start the local development server:**
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to the local Vite URL (e.g., `http://localhost:5173`).

## Deployment

The application frontend is configured to deploy correctly on modern platforms such as Vercel (using the included `vercel.json`) or Firebase Hosting. Server-side payment functions run natively on Firebase Cloud Functions.
