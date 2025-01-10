import React from 'react';
import { IndianRupee } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function PaymentSettings() {
  const { upiDetails, updateUpiDetails } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <IndianRupee className="w-5 h-5" />
        Payment Settings
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Payee Name</label>
          <input
            type="text"
            value={upiDetails?.payeeName || ''}
            onChange={(e) => updateUpiDetails({ ...upiDetails, payeeName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Enter merchant/payee name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">UPI ID</label>
          <input
            type="text"
            value={upiDetails?.upiId || ''}
            onChange={(e) => updateUpiDetails({ ...upiDetails, upiId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="username@bank"
          />
          <p className="mt-1 text-sm text-gray-500">
            This UPI ID will be used to generate QR codes for bill payments
          </p>
        </div>
      </form>
    </div>
  );
}