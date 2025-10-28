import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">AURA Unified Marketplace</h1>
          <div className="flex space-x-4">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center py-12">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Smart. Simple. Sell it with AI.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                The AI-powered marketplace connecting buyers, sellers, and logistics with autonomous supply chain optimization.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">For Buyers</h3>
                  <p className="text-gray-600">
                    Discover products with AI-powered recommendations and smart search.
                  </p>
                  <Link to="/login" className="mt-4 inline-block btn-primary">
                    Browse Products
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">For Sellers</h3>
                  <p className="text-gray-600">
                    List products with AI pricing suggestions and automated inventory management.
                  </p>
                  <Link to="/signup" className="mt-4 inline-block btn-secondary">
                    Start Selling
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">Autonomous Logistics</h3>
                  <p className="text-gray-600">
                    AI-optimized delivery routes with real-time tracking and predictive ETAs.
                  </p>
                  <button className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AURA Unified Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;