# AURA Unified Marketplace - Setup Instructions

## Project Overview

You've just created the complete structure for the AURA Unified Marketplace, an AI-powered web marketplace that combines features of OLX, Amazon/Flipkart, and an Autonomous Supply Chain Optimizer.

## Project Structure

The project is organized into three main components:

1. **Client (React Frontend)** - `aura-marketplace/client/`
2. **Server (Node.js Backend)** - `aura-marketplace/server/`
3. **ML Service (Python)** - `aura-marketplace/python_ml/`

## Getting Started

### 1. Client Setup (React Frontend)

Navigate to the client directory:
```bash
cd aura-marketplace/client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### 2. Server Setup (Node.js Backend)

Navigate to the server directory:
```bash
cd aura-marketplace/server
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The backend API will be available at http://localhost:5000

### 3. ML Service Setup (Python)

Navigate to the Python ML directory:
```bash
cd aura-marketplace/python_ml
```

Create a virtual environment (recommended):
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Start the ML service:
```bash
python ml_service.py
```

The ML service will be available at http://localhost:5001

## Firebase Configuration

To connect the application to Firebase:

1. Create a Firebase project at https://console.firebase.google.com/
2. Register web app in Firebase console
3. Update the Firebase configuration in `aura-marketplace/client/src/firebase/firebaseConfig.js` with your project credentials

## Environment Variables

Create `.env` files in each service directory with necessary environment variables:

### Client `.env` (aura-marketplace/client/.env)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Server `.env` (aura-marketplace/server/.env)
```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_service_account_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### ML Service `.env` (aura-marketplace/python_ml/.env)
```env
OPENAI_API_KEY=your_openai_api_key
FLASK_ENV=development
```

## Next Steps

1. **Implement Firebase Integration**
   - Connect the frontend to your Firebase project
   - Implement authentication flows
   - Set up Firestore collections

2. **Develop Core Features**
   - Implement user registration and login
   - Build product listing functionality
   - Create buyer and seller dashboards

3. **Integrate ML Services**
   - Train and deploy ML models
   - Connect Node.js backend to Python ML service
   - Implement AI-powered features

4. **Enhance UI/UX**
   - Refine the design system
   - Add responsive layouts
   - Implement accessibility features

5. **Testing and Deployment**
   - Write unit and integration tests
   - Set up CI/CD pipelines
   - Deploy to production environments

## Development Phases (Estimated Timeline)

- **Phase 1 (0-4 hours)**: Setup React, Node, Firebase
- **Phase 2 (4-8 hours)**: Buyer & Seller Auth + Dashboards
- **Phase 3 (8-12 hours)**: Product listing and AI Price Suggestion
- **Phase 4 (12-18 hours)**: Chat + Offer system
- **Phase 5 (18-24 hours)**: ML integration with Flask (price prediction)
- **Phase 6 (24-30 hours)**: Add logistics tracking + ETA prediction
- **Phase 7 (30-36 hours)**: Implement AI route optimizer
- **Phase 8 (36-48 hours)**: UI polish, deployment, and testing

## Support

For issues or questions about the project, refer to the documentation in each component's README or contact the development team.