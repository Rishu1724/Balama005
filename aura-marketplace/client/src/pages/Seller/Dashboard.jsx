import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  // Sample data
  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      stock: 15,
      category: 'Electronics',
      sales: 24,
      revenue: 2159.76,
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      price: 49.99,
      stock: 8,
      category: 'Wearables',
      sales: 12,
      revenue: 599.88,
    },
  ];

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      product: 'Wireless Bluetooth Headphones',
      date: '2023-05-15',
      status: 'Shipped',
      amount: 89.99,
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      product: 'Smart Fitness Tracker',
      date: '2023-05-10',
      status: 'Processing',
      amount: 49.99,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Add Product
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
              Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
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
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Add New Product
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md"></div>
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
                            <p className="text-lg font-bold text-gray-900">{product.stock}</p>
                            <p className="text-gray-500 text-sm">In Stock</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{product.sales}</p>
                            <p className="text-gray-500 text-sm">Sales</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">${product.revenue}</p>
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
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <li key={order.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Order #{order.id}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Shipped'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Customer: {order.customer}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            Product: {order.product}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>${order.amount}</p>
                          <p className="ml-4">{order.date}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Mark as Shipped
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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