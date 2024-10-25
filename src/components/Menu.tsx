import React from 'react';
import { Utensils } from 'lucide-react';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
}

interface MenuProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export function Menu({ menuItems, onAddToCart }: MenuProps) {
  return (
    <div className="w-2/3 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div 
            key={item._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}