import React from 'react';
import { Bill } from '../../../types';
import { format } from 'date-fns';

export function ModernTheme({ bill }: { bill: Bill }) {
  return (
    <div className="p-8 bg-white">
      <div className="border-b pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>
        <div className="mt-4 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Invoice#</h2>
            <p className="mt-1 text-xl">{bill.billNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-medium text-gray-500">Date</h2>
            <p className="mt-1">{format(bill.date, 'dd MMM yyyy')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Billed by</h2>
          <div className="text-sm space-y-2">
            <p className="font-medium">{bill.businessName}</p>
            <p className="text-gray-600">{bill.businessAddress}</p>
            {bill.gstNumber && (
              <>
                <p className="text-gray-600">GSTIN: {bill.gstNumber}</p>
                <p className="text-gray-600">PAN: {bill.panNumber}</p>
              </>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Billed to</h2>
          <div className="text-sm space-y-2">
            <p className="font-medium">{bill.customerName}</p>
            <p className="text-gray-600">{bill.customerPhone}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Item Description</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Qty</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Rate</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-4 text-sm">{item.productName}</td>
              <td className="px-4 py-4 text-sm text-right">{item.quantity}</td>
              <td className="px-4 py-4 text-sm text-right">₹{item.price.toLocaleString('en-IN')}</td>
              <td className="px-4 py-4 text-sm text-right">₹{item.subtotal.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-80 space-y-3">
          <div className="flex justify-between py-2 text-sm border-b">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{bill.total.toLocaleString('en-IN')}</span>
          </div>
          {bill.gst && (
            <div className="flex justify-between py-2 text-sm border-b">
              <span className="text-gray-600">GST ({bill.gst}%)</span>
              <span>₹{((bill.total * bill.gst) / 100).toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between py-3 text-lg font-bold">
            <span>Total</span>
            <span>₹{(bill.total + (bill.total * (bill.gst || 0)) / 100).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {bill.upiDetails && (
        <div className="mt-8 pt-8 border-t">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium mb-4">Bank & Payment Details</h3>
              <div className="text-sm space-y-2">
                <p>Account Holder: {bill.upiDetails.payeeName}</p>
                <p>UPI ID: {bill.upiDetails.upiId}</p>
              </div>
            </div>
            <div>
              <img src={bill.upiDetails.qrCode} alt="UPI QR Code" className="w-32 h-32" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}