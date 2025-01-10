import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Trash2, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useQuotationStore } from '../../store/quotationStore';
import { Quotation, PaymentMilestone, QuotationItem } from '../../types/quotation';
import { generateQuotationNumber, validateMilestones } from '../../utils/quotationUtils';

export function QuotationForm({ onSubmit }: { onSubmit: () => void }) {
  const { products } = useStore();
  const { quotations, addQuotation } = useQuotationStore();
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [milestones, setMilestones] = useState<PaymentMilestone[]>([]);
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorPhone: '',
    vendorAddress: '',
    deliveryAddress: '',
    expectedDeliveryDate: '',
    specialInstructions: '',
    businessPhone: '',
  });

  const addItem = () => {
    setItems([
      ...items,
      {
productId: '',
quantity: 1,
price: 0,
subtotal: 0
},
    ]);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        id: crypto.randomUUID(),
        description: '',
        percentage: 0,
        amount: 0,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMilestones(milestones)) {
      alert('Payment milestones must total 100%');
      return;
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const quotation: Quotation = {
      id: crypto.randomUUID(),
      quotationNumber: generateQuotationNumber(quotations.length + 1),
      date: new Date(),
      ...formData,
      items,
      total,
      paymentMilestones: milestones,
      status: 'draft',
    };

    addQuotation(quotation);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vendor Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Vendor Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vendor Name"
            value={formData.vendorName}
            onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
            className="input-field"
            required
          />
          {/* Add other vendor fields */}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        {/* Add items list */}
      </div>

      {/* Payment Milestones */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Milestones</h3>
          <button
            type="button"
            onClick={addMilestone}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" /> Add Milestone
          </button>
        </div>
        {/* Add milestones list */}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" /> Save Quotation
        </button>
      </div>
    </form>
  );
}