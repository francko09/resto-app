import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, User, Menu as MenuIcon } from 'lucide-react';
import { MenuManagement } from './MenuManagement';
import type { Order } from '../types';

interface AdminViewProps {
  orders: Order[];
  onServeOrder: (orderId: string) => Promise<void>;
  onMenuUpdate: () => Promise<void>;
}

export function AdminView({ orders, onServeOrder, onMenuUpdate }: AdminViewProps) {
  const [showMenuManagement, setShowMenuManagement] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'served':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (showMenuManagement) {
    return <MenuManagement 
      onBack={() => setShowMenuManagement(false)} 
      onMenuUpdate={onMenuUpdate}
    />;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-800">Order Management</h1>
          <button
            onClick={() => setShowMenuManagement(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
            Manage Menu
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Current Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No orders at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <h3 className="font-semibold text-gray-800">
                        Order #{order._id}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{order.username}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="pl-0 sm:pl-7">
                    <ul className="space-y-1 mb-3">
                      {order.items.map((item, index) => (
                        <li 
                          key={`${order._id}-item-${index}`}
                          className="text-gray-600 flex justify-between"
                        >
                          <span>{item.name}</span>
                          <span className="text-orange-600 font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <span className={`text-sm font-medium ${
                        order.status === 'served' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => onServeOrder(order._id)}
                          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Served
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}