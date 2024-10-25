import React from 'react';
import { Utensils } from 'lucide-react';

export function MenuHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Utensils className="w-6 h-6 text-orange-600" />
      <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
    </div>
  );
}