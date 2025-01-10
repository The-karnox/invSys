import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export function StockAlert() {
  const { stockAlerts } = useStore();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || stockAlerts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md">
        <div className="bg-orange-50 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="font-medium text-orange-800">Low Stock Alert</h3>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-orange-500 hover:text-orange-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="space-y-2">
            {stockAlerts.map(alert => (
              <div 
                key={alert.id}
                className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 py-2"
              >
                <span className="font-medium text-gray-700">{alert.name}</span>
                <span className="text-gray-600">
                  {alert.stock} items remaining
                  <span className="text-orange-600 ml-2">
                    (Reorder point: {alert.reorderPoint})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}