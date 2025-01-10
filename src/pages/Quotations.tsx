import React, { useState } from 'react';
import { Plus, Eye, Download, X, Edit } from 'lucide-react';
import { useQuotationStore } from '../store/quotationStore';
import { QuotationModal } from '../components/Quotation/QuotationModal';
import { QuotationPreview } from '../components/Quotation/QuotationPreview';
import { SearchBar } from '../components/ui/SearchBar';
import { Quotation } from '../types/quotation';
import { format } from 'date-fns';
import { generateQuotationPDF } from '../utils/quotationPdfGenerator';
import { useStore } from '../store/useStore';

export function Quotations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [previewQuotation, setPreviewQuotation] = useState<Quotation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { quotations, addQuotation, updateQuotation } = useQuotationStore();
  const { products } = useStore();

  const filteredQuotations = quotations.filter(quotation => 
    quotation.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quotation.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (quotation: Quotation) => {
    if (editingQuotation) {
      updateQuotation(quotation);
    } else {
      addQuotation(quotation);
    }
    setIsModalOpen(false);
    setEditingQuotation(null);
  };

  const handleDownload = (quotation: Quotation) => {
    generateQuotationPDF(quotation, products);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quotations</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700"
        >
          <Plus className="w-4 h-4" />
          Create Quotation
        </button>
      </div>

      <div className="w-full max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search quotations..."
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quotation No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.quotationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quotation.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(quotation.date, 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{quotation.total.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      quotation.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : quotation.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingQuotation(quotation);
                          setIsModalOpen(true);
                        }}
                        className="text-primary-600 hover:text-primary-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewQuotation(quotation)}
                        className="text-primary-600 hover:text-primary-800"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(quotation)}
                        className="text-primary-600 hover:text-primary-800"
                        title="Download"
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

      {(isModalOpen || editingQuotation) && (
        <QuotationModal
          quotation={editingQuotation}
          onClose={() => {
            setIsModalOpen(false);
            setEditingQuotation(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {previewQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quotation Preview</h2>
              <button
                onClick={() => setPreviewQuotation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <QuotationPreview quotation={previewQuotation} />
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setPreviewQuotation(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(previewQuotation)}
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