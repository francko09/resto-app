import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MenuItemType } from './types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-1">{item.name}</h3>
            <p className="text-sm md:text-base text-gray-100 line-clamp-2 mb-2">{item.description}</p>
            <span className="inline-block px-3 py-1 bg-orange-500/90 text-white rounded-full font-medium text-sm md:text-base">
              ${item.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 md:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-base font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}