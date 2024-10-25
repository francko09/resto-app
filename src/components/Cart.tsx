import React from 'react';
import { Trash2, ShoppingBag, X } from 'lucide-react';
import { MenuItemType } from './Menu/types';

interface CartProps {
  cart: MenuItemType[];
  onPlaceOrder: () => void;
  onRemoveItem: (index: number) => void;
  onClose: () => void;
}

export function Cart({ cart, onPlaceOrder, onRemoveItem, onClose }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
          <h2 className="text-xl md:text-2xl font-bold text-orange-800">Your Cart</h2>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
          <p className="text-sm text-gray-500 mt-2">Add some delicious items to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-orange-600 font-medium">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-orange-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-orange-700">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}