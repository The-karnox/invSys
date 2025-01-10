import React from 'react';
import { Bill } from '../../../types';
import { format } from 'date-fns';

export function MinimalTheme({ bill }: { bill: Bill }) {
  return (
    <div className="p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tax Invoice</h1>
        <div className="mt-4 text-sm text-gray-600">
          <p>{bill.billNumber}</p>
          <p>{format(bill.date, 'dd MMM yyyy')}</p>
          {bill.gstNumber && <p>GST: {bill.gstNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-sm font-medium text-gray-600 mb-2">Bill To</h2>
          <div className="text-sm">
            <p className="font-medium">{bill.customerName}</p>
            <p>{bill.customerPhone}</p>
          </div>
        </div>
        <div>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>Invoice Date</span>
              <span>{format(bill.date, 'dd MMM yyyy')}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Due Date</span>
              <span>{format(bill.date, 'dd MMM yyyy')}</span>
            </div>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="py-2 text-left text-sm font-medium text-gray-600">Description</th>
            <th className="py-2 text-right text-sm font-medium text-gray-600">Quantity</th>
            <th className="py-2 text-right text-sm font-medium text-gray-600">Rate</th>
            <th className="py-2 text-right text-sm font-medium text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-sm">{index + 1}</td>
              <td className="py-2 text-sm">{item.productName}</td>
              <td className="py-2 text-sm text-right">{item.quantity}</td>
              <td className="py-2 text-sm text-right">₹{item.price.toLocaleString('en-IN')}</td>
              <td className="py-2 text-sm text-right">₹{item.subtotal.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-2 text-sm">
            <span>Sub Total</span>
            <span>₹{bill.total.toLocaleString('en-IN')}</span>
          </div>
          {bill.gst && (
            <div className="flex justify-between py-2 text-sm border-b">
              <span>GST ({bill.gst}%)</span>
              <span>₹{((bill.total * bill.gst) / 100).toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>Total</span>
            <span>₹{(bill.total + (bill.total * (bill.gst || 0)) / 100).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {bill.upiDetails && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Payment Details</h3>
          <div className="flex gap-8">
            <div className="text-sm space-y-1">
              <p>Account Name: {bill.upiDetails.payeeName}</p>
              <p>UPI ID: {bill.upiDetails.upiId}</p>
            </div>
            <div>
              {/* QR Code will be rendered here */}
              <img src={bill.upiDetails.qrCode} alt="UPI QR Code" className="w-32 h-32" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}