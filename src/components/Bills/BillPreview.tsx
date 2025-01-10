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
            <h2 className="text-2xl font-bold text-gray-800">{bill.billNumber}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Due date: {format(bill.date, 'dd MMMM yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Currency</p>
            <p className="font-medium">INR - Indian Rupee</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600">Billed to:</p>
            <p className="font-medium mt-1">{bill.customerName}</p>
            <p className="text-sm text-gray-600 mt-1">{bill.customerPhone}</p>
            {bill.isGstBill && bill.gstNumber && (
              <p className="text-sm text-gray-600 mt-1">GST: {bill.gstNumber}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Payment Type:</p>
            <p className="font-medium mt-1 capitalize">{bill.paymentType}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200 text-sm">
            <th className="py-3 text-left font-medium text-gray-600">DESCRIPTION</th>
            <th className="py-3 text-right font-medium text-gray-600">QTY</th>
            <th className="py-3 text-right font-medium text-gray-600">UNIT PRICE</th>
            <th className="py-3 text-right font-medium text-gray-600">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">{product?.name}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                <td className="py-4 text-right">₹{item.subtotal.toLocaleString('en-IN')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{bill.total.toLocaleString('en-IN')}</span>
            </div>
            {bill.isGstBill && bill.totalGst && (
              <div className="flex justify-between">
                <span className="text-gray-600">GST</span>
                <span>₹{bill.totalGst.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{(bill.total + (bill.totalGst || 0)).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}