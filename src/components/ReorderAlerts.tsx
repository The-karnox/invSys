import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ReorderAlert } from '../types';

export function ReorderAlerts() {
  const { products } = useStore();
  
  const alerts: ReorderAlert[] = products
    .filter(product => product.stock <= product.reorderPoint)
    .map(product => ({
      productId: product.id,
      currentStock: product.stock,
      reorderPoint: product.reorderPoint
    }));

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-500">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Low Stock Alert</h3>
            <div className="mt-1 text-sm text-gray-600">
              {alerts.map(alert => {
                const product = products.find(p => p.id === alert.productId);
                return (
                  <p key={alert.productId}>
                    {product?.name}: {alert.currentStock} items remaining
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}