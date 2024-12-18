import React from 'react';
import { format } from 'date-fns';
import { Bill } from '../../types';
import { useStore } from '../../store/useStore';

interface BillPreviewProps {
  bill: Bill;
}

export function BillPreview({ bill }: BillPreviewProps) {
  const { products } = useStore();

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
            <p className="text-sm text-gray-600 mt-1">Bill Number: {bill.billNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date:</p>
            <p className="font-medium">{format(bill.date, 'dd/MM/yyyy')}</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600">Bill To:</p>
            <p className="font-medium mt-1">{bill.customerName}</p>
            <p className="text-sm text-gray-600 mt-1">{bill.customerPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Payment Type:</p>
            <p className="font-medium mt-1 capitalize">{bill.paymentType}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 text-left">Item</th>
            <th className="py-2 text-right">Qty</th>
            <th className="py-2 text-right">Price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-2">{product?.name}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                <td className="py-2 text-right">₹{item.subtotal.toLocaleString('en-IN')}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="py-2 text-right font-medium">Total:</td>
            <td className="py-2 text-right font-bold">₹{bill.total.toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">Terms & Conditions:</p>
        <p className="text-sm mt-1">Payment is due within 30 days</p>
      </div>
    </div>
  );
}