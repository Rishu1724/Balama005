import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { subscribeToUserProfile, subscribeToProducts } from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [userProfile, setUserProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Subscribe to user profile updates
    const unsubscribeProfile = subscribeToUserProfile(
      currentUser.uid, 
      'buyers', 
      (profile) => {
        setUserProfile(profile);
      }
    );

    // Subscribe to products updates
    const unsubscribeProducts = subscribeToProducts((products) => {
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeProfile();
      unsubscribeProducts();
    };
  }, [currentUser, navigate]);

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get unique categories for filter dropdown
  const categories = ['All', ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Notifications
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* User Profile Info */}
      {userProfile && (
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome, {userProfile.name}
                </h2>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-gray-600">{userProfile.phone}</p>
                <p className="text-gray-600">{userProfile.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-medium">
                  {userProfile.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Spent</h3>
            <p className="text-3xl font-bold text-green-600">$1,245.50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Favorites</h3>
            <p className="text-3xl font-bold text-yellow-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
            <p className="text-3xl font-bold text-purple-600">3</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Browse Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`${
                activeTab === 'recommendations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Recommendations
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedCategory !== 'All' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No products available at the moment'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-gray-500 text-sm">{product.category}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-600 ml-1">4.5</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-gray-500 text-sm">{product.condition}</span>
                      </div>
                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                          View Details
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg">
                          ♡
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500">Your orders will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended for You</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">
                Based on your browsing history and preferences, our AI recommends these products:
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Smart Home Bundle</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Save 15% on smart home devices purchased together
                  </p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Bundle
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">Electronics Accessories</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Complementary accessories for your recent purchases
                  </p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerDashboard;