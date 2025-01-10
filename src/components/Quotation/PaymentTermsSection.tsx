import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PaymentTerm } from '../../types/quotation';
import { PREDEFINED_PAYMENT_TERMS } from '../../utils/paymentTerms';

interface PaymentTermsSectionProps {
  terms: PaymentTerm[];
  onChange: (terms: PaymentTerm[]) => void;
}

export function PaymentTermsSection({ terms, onChange }: PaymentTermsSectionProps) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    if (presetId === 'custom') {
      setShowCustom(true);
      onChange([{ id: crypto.randomUUID(), type: 'custom', description: '', percentage: 0 }]);
    } else {
      setShowCustom(false);
      const preset = PREDEFINED_PAYMENT_TERMS.find(p => p.id === presetId);
      if (preset) {
        onChange(preset.terms.map(term => ({
          id: crypto.randomUUID(),
          type: 'predefined',
          description: term.description,
          percentage: term.percentage
        })));
      }
    }
  };

  const addCustomTerm = () => {
    onChange([...terms, { 
      id: crypto.randomUUID(),
      type: 'custom',
      description: '',
      percentage: 0
    }]);
  };

  const updateTerm = (id: string, updates: Partial<PaymentTerm>) => {
    onChange(terms.map(term => 
      term.id === id ? { ...term, ...updates } : term
    ));
  };

  const removeTerm = (id: string) => {
    onChange(terms.filter(term => term.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Terms
        </label>
        <select
          value={selectedPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select Payment Terms</option>
          {PREDEFINED_PAYMENT_TERMS.map(preset => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
          <option value="custom">Custom Terms</option>
        </select>
      </div>

      {showCustom && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-700">Custom Terms</h4>
            <button
              type="button"
              onClick={addCustomTerm}
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Term
            </button>
          </div>

          {terms.map(term => (
            <div key={term.id} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={term.description}
                  onChange={(e) => updateTerm(term.id, { description: e.target.value })}
                  placeholder="e.g., Advance Payment"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={term.percentage}
                  onChange={(e) => updateTerm(term.id, { percentage: Number(e.target.value) })}
                  placeholder="%"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                  max="100"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTerm(term.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Conditions
            </label>
            <textarea
              value={terms[0]?.conditions || ''}
              onChange={(e) => updateTerm(terms[0].id, { conditions: e.target.value })}
              placeholder="e.g., Late payments incur a 2% penalty"
              rows={2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {terms.length > 0 && (
        <div className="text-sm text-gray-500">
          Total: {terms.reduce((sum, term) => sum + term.percentage, 0)}%
          {terms.reduce((sum, term) => sum + term.percentage, 0) !== 100 && (
            <span className="text-red-500 ml-2">
              (Must total 100%)
            </span>
          )}
        </div>
      )}
    </div>
  );
}