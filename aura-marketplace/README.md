# AURA Unified Marketplace

An AI-powered web marketplace combining features of OLX (resale), Amazon/Flipkart (e-commerce), and an Autonomous Supply Chain Optimizer.

## System Architecture

```
AURA-Unified-Marketplace/
│
├── client/                                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                        # Logos, icons, static images
│   │   ├── components/                    # Reusable UI components
│   │   ├── pages/                         # Page-level views
│   │   │   ├── Buyer/                     # Buyer-specific pages
│   │   │   ├── Seller/                    # Seller-specific pages
│   │   │   ├── Admin/                     # Admin dashboard pages
│   │   ├── context/                       # React Context
│   │   ├── hooks/                         # Custom React hooks
│   │   ├── services/                      # Axios calls to backend APIs
│   │   ├── utils/                         # Helper functions
│   │   ├── firebase/                      # Firebase config
│   │   │   └── firebaseConfig.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                                # Node.js + Express Backend
│   ├── src/
│   │   ├── routes/                        # All REST API routes
│   │   ├── controllers/                   # Business logic for each route
│   │   ├── middleware/                    # Authentication & error handlers
│   │   ├── models/                        # Firebase/Firestore model abstractions
│   │   └── utils/                         # Helper functions
│   ├── app.js
│   └── package.json
│
├── python_ml/                             # Python ML Microservice
│   ├── ml_service.py                      # Flask API for ML models
│   ├── price_model.pkl                    # Trained price prediction model
│   ├── recommend_model.pkl                # Trained recommendation model
│   ├── eta_model.pkl                      # Trained ETA prediction model
│   ├── fraud_model.pkl                    # Trained fraud detection model
│   └── requirements.txt                   # Python dependencies
│
└── README.md
```

## Tech Stack

- **Frontend**: React (Vite + TailwindCSS)
- **Backend**: Node.js + Express.js
- **Database**: Firebase (Auth + Firestore + Storage)
- **ML Models**: Python (scikit-learn, TensorFlow, Flask/FastAPI)
- **AI**: OpenAI API, LangChain
- **Hosting**: Vercel (frontend), Render or Railway (backend)

## Features

### Core Concept – Autonomous Supply-Chain Optimiser

An advanced system that uses Artificial Intelligence (AI) and Machine Learning (ML) to manage, control, and optimize the entire flow of goods and services—from raw materials to final delivery—with little to no human intervention.

### Modules

1. **Authentication & User Management**
   - Buyer and Seller separate login portals
   - Firebase Auth for email/password and Google sign-in
   - JWT used for backend API verification

2. **Product Listings (Seller)**
   - Add/edit/delete product listings
   - Upload multiple product images to Firebase Storage
   - AI Price Suggestion
   - AI Ad Description Generator

3. **Search & Recommendation (Buyer)**
   - Search by keyword, category, and price filters
   - AI-based search normalization
   - ML-based personalized product recommendations

4. **Chat and Negotiation**
   - Realtime buyer-seller chat via Firestore
   - AI Negotiator suggests fair counteroffers

5. **Cart & Checkout**
   - Add items to cart and checkout
   - Razorpay (sandbox mode) for payments
   - Orders stored in Firestore

6. **Autonomous Supply Chain & Logistics**
   - Shipment creation after order placement
   - AI system optimizes delivery routes
   - Predicts ETA and reroutes dynamically

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Firebase account
- OpenAI API key (for AI features)

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### ML Service Setup

```bash
cd python_ml
pip install -r requirements.txt
python ml_service.py
```

## API Endpoints

### Authentication
- `POST /api/auth/login/buyer` - Buyer login
- `POST /api/auth/login/seller` - Seller login
- `POST /api/auth/register/buyer` - Buyer registration
- `POST /api/auth/register/seller` - Seller registration

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get buyer's orders
- `GET /api/orders/my-sales` - Get seller's sales

### ML Services
- `POST /api/ml/price` - Price prediction
- `POST /api/ml/recommend` - Product recommendations
- `POST /api/ml/fraud-detect` - Fraud detection
- `POST /api/ml/eta` - ETA prediction
- `POST /api/ml/optimize-route` - Route optimization

## Firebase Structure

- `buyers/` - Buyer user data
- `sellers/` - Seller user data
- `products/` - Product listings
- `orders/` - Order information
- `shipments/` - Shipment tracking
- `chats/` - Chat messages
- `reviews/` - Product reviews
- `ml_logs/` - ML service logs
- `notifications/` - User notifications

## Development Phases

0–4 hrs: Setup React, Node, Firebase
4–8 hrs: Buyer & Seller Auth + Dashboards
8–12 hrs: Product listing and AI Price Suggestion
12–18 hrs: Chat + Offer system
18–24 hrs: ML integration with Flask (price prediction)
24–30 hrs: Add logistics tracking + ETA prediction
30–36 hrs: Implement AI route optimizer
36–48 hrs: UI polish, deployment, and testing

## Future Enhancements

- Image-based search using CLIP embeddings
- Voice search and chatbot-based buying
- Blockchain-based seller verification
- IoT integration for live sensor tracking
- Multilingual AI assistant