import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Bill, BillItem } from '../types';

interface BillModalProps {
  onClose: () => void;
  onSubmit: (bill: Bill) => void;
}

export function BillModal({ onClose, onSubmit }: BillModalProps) {
  const { products } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<BillItem[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: '',
        quantity: 1,
        price: 0,
        subtotal: 0,
      },
    ]);
  };

  const updateItem = (index: number, updates: Partial<BillItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };

    if (updates.productId) {
      const product = products.find((p) => p.id === updates.productId);
      if (product) {
        newItems[index].price = product.price;
        newItems[index].subtotal = product.price * newItems[index].quantity;
      }
    }

    if (updates.quantity) {
      newItems[index].subtotal = newItems[index].price * updates.quantity;
    }

    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    onSubmit({
      id: crypto.randomUUID(),
      customerName,
      items,
      total,
      date: new Date(),
      status: 'pending',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Generate Bill</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(index, { productId: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ₹{product.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="text"
                      value={`₹${item.subtotal}`}
                      className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Generate Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}