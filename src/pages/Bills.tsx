import React, { useState } from 'react';
import { Plus, Download, Eye, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Bill } from '../types';
import { BillModal } from '../components/Bills/BillModal';
import { BillPreview } from '../components/Bills/BillPreview';
import { LoadingShimmer } from '../components/LoadingShimmer';
import { SearchBar } from '../components/ui/SearchBar';
import { generatePDF } from '../utils/pdfGenerator';

export function Bills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewBill, setPreviewBill] = useState<Bill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { bills, products, createBill, loading } = useStore();

  const filteredBills = bills.filter(bill => 
    bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeneratePDF = (bill: Bill) => {
    generatePDF(bill, products);
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
                        onClick={() => handleGeneratePDF(bill)}
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
                  onClick={() => handleGeneratePDF(previewBill)}
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