import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { subscribeToUserProfile, subscribeToUserProducts } from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [userProfile, setUserProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
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
      'sellers', 
      (profile) => {
        setUserProfile(profile);
      }
    );

    // Subscribe to user's products
    const unsubscribeProducts = subscribeToUserProducts(
      currentUser.uid, 
      (products) => {
        setProducts(products);
        setLoading(false);
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeProfile();
      unsubscribeProducts();
    };
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProductAdded = (newProduct) => {
    // Add the new product to the local state
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    // Hide the form
    setShowAddProductForm(false);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAddProductForm(!showAddProductForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {showAddProductForm ? 'Cancel' : 'Add Product'}
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
                {userProfile.companyName && (
                  <p className="text-gray-600">Company: {userProfile.companyName}</p>
                )}
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
        {/* Add Product Form */}
        {showAddProductForm && (
          <div className="mb-8">
            <ProductForm onProductAdded={handleProductAdded} />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
            <p className="text-3xl font-bold text-green-600">142</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
            <p className="text-3xl font-bold text-yellow-600">$12,450.50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pending Orders</h3>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
              <button 
                onClick={() => setShowAddProductForm(!showAddProductForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add New Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-500 mb-4">Add your first product to get started</p>
                <button 
                  onClick={() => setShowAddProductForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Add New Product
                </button>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="flex-shrink-0 h-12 w-12 object-cover rounded-md"
                              />
                            ) : (
                              <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md"></div>
                            )}
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                              <p className="text-gray-500 text-sm">{product.category}</p>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">${product.price}</p>
                              <p className="text-gray-500 text-sm">Price</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">In Stock</p>
                              <p className="text-gray-500 text-sm">Inventory</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">0</p>
                              <p className="text-gray-500 text-sm">Sales</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">$0.00</p>
                              <p className="text-gray-500 text-sm">Revenue</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500">Orders from customers will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Revenue chart visualization</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Product ranking visualization</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-1">
                    <p className="font-medium text-gray-900">Price Optimization Suggestion</p>
                    <p className="text-gray-600">
                      Consider increasing the price of "Wireless Bluetooth Headphones" by 5% based on market analysis.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <p className="font-medium text-gray-900">Inventory Alert</p>
                    <p className="text-gray-600">
                      "Smart Fitness Tracker" stock is low (8 units remaining). Consider restocking soon.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-1">
                    <p className="font-medium text-gray-900">Market Trend</p>
                    <p className="text-gray-600">
                      Electronics category is trending up 12% this month. Consider adding more products in this category.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;