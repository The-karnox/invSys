import React, { useState } from 'react';
import { Plus, Download, Eye, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import { BillModal } from '../components/Bills/BillModal';
import { BillPreview } from '../components/Bills/BillPreview';
import { Bill } from '../types';
import { LoadingShimmer } from '../components/LoadingShimmer';
import { SearchBar } from '../components/ui/SearchBar';

export function Bills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewBill, setPreviewBill] = useState<Bill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { bills, products, createBill, loading } = useStore();

  const filteredBills = bills.filter(bill => 
    bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = (bill: Bill) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('CloudLedger', 20, 20);
    doc.setFontSize(12);
    doc.text('Invoice', 20, 30);
    
    // Bill Details
    doc.text(`Bill No: ${bill.billNumber}`, 20, 40);
    doc.text(`Customer: ${bill.customerName}`, 20, 50);
    doc.text(`Phone: ${bill.customerPhone}`, 20, 60);
    doc.text(`Date: ${format(bill.date, 'dd/MM/yyyy')}`, 20, 70);
    doc.text(`Payment Type: ${bill.paymentType}`, 20, 80);
    
    // Table Header
    let y = 100;
    doc.setFillColor(235, 94, 40); // #eb5e28
    doc.setTextColor(255, 255, 255);
    doc.rect(20, y - 5, 170, 10, 'F');
    doc.text('Item', 20, y);
    doc.text('Qty', 100, y);
    doc.text('Price', 130, y);
    doc.text('Total', 160, y);
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    
    // Table Content
    y += 10;
    bill.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      doc.text(product?.name || '', 20, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₹${item.price.toLocaleString('en-IN')}`, 130, y);
      doc.text(`₹${item.subtotal.toLocaleString('en-IN')}`, 160, y);
      y += 10;
    });
    
    // Total
    y += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(130, y - 5, 60, 10, 'F');
    doc.text(`Total: ₹${bill.total.toLocaleString('en-IN')}`, 130, y + 3);
    
    doc.save(`${bill.billNumber}.pdf`);
  };

  if (loading) {
    return <LoadingShimmer />;
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Bills</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700"
        >
          <Plus className="w-4 h-4" />
          Generate Bill
        </button>
      </div>

      <div className="w-full max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search bills..."
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{bill.billNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bill.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{format(bill.date, 'dd/MM/yyyy')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{bill.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      bill.paymentType === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {bill.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewBill(bill)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generatePDF(bill)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <BillModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(bill) => {
            createBill(bill);
            setIsModalOpen(false);
          }}
        />
      )}

      {previewBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bill Preview</h2>
              <button onClick={() => setPreviewBill(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <BillPreview bill={previewBill} />
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setPreviewBill(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => generatePDF(previewBill)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}