import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';

interface OrderConfirmationProps {
  onBackToMenu: () => void;
}

export function OrderConfirmation({ onBackToMenu }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="mb-6">
          <Check className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Confirmed!</h2>
        <p className="text-gray-600 mb-8">Your order has been received and is being prepared.</p>
        <button
          onClick={onBackToMenu}
          className="flex items-center justify-center gap-2 mx-auto bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>
      </div>
    </div>
  );
}