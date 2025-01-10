import React from 'react';
import { format } from 'date-fns';
import { Quotation } from '../../types/quotation';
import { useStore } from '../../store/useStore';

interface QuotationPreviewProps {
  quotation: Quotation;
}

export function QuotationPreview({ quotation }: QuotationPreviewProps) {
  const { products } = useStore();

  if (!products || !quotation) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{quotation.quotationNumber}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Date: {format(quotation.date, 'dd MMMM yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Status</p>
            <p className={`inline-block px-2 py-1 rounded-full text-sm capitalize ${
              quotation.status === 'accepted'
                ? 'bg-green-100 text-green-800'
                : quotation.status === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {quotation.status}
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600">Business Details:</p>
            <p className="font-medium mt-1">{quotation.businessName}</p>
            <p className="text-sm text-gray-600 mt-1">{quotation.businessAddress}</p>
            <p className="text-sm text-gray-600">{quotation.businessPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Vendor Details:</p>
            <p className="font-medium mt-1">{quotation.vendorName}</p>
            <p className="text-sm text-gray-600 mt-1">{quotation.vendorEmail}</p>
            <p className="text-sm text-gray-600">{quotation.vendorPhone}</p>
            <p className="text-sm text-gray-600">{quotation.vendorAddress}</p>
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
          {quotation.items.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">{product?.name || 'Unknown Product'}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                <td className="py-4 text-right">₹{item.subtotal.toLocaleString('en-IN')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium mb-2">Payment Terms</h4>
          <div className="space-y-2">
            {quotation.paymentTerms.map((term) => (
              <div key={term.id} className="flex justify-between text-sm">
                <span>{term.description}</span>
                <span>{term.percentage}%</span>
              </div>
            ))}
            {quotation.paymentTerms[0]?.conditions && (
              <p className="text-sm text-gray-600 mt-2">
                Conditions: {quotation.paymentTerms[0].conditions}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold">₹{quotation.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {quotation.specialInstructions && (
        <div className="mt-8 border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-2">Special Instructions</h4>
          <p className="text-sm text-gray-600">{quotation.specialInstructions}</p>
        </div>
      )}
    </div>
  );
}