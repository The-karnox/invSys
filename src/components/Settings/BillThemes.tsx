import React from 'react';
import { useStore } from '../../store/useStore';
import { BillTheme } from '../../types';
import { Check } from 'lucide-react';

const themes: BillTheme[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    preview: '/themes/minimal.png',
    description: 'Clean and simple design with essential information',
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: '/themes/professional.png',
    description: 'Traditional business layout with company branding',
  },
  {
    id: 'modern',
    name: 'Modern',
    preview: '/themes/modern.png',
    description: 'Contemporary design with bold typography',
  },
];

export function BillThemes() {
  const { selectedBillTheme, setSelectedBillTheme } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Bill Themes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => setSelectedBillTheme(theme.id)}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedBillTheme === theme.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {selectedBillTheme === theme.id && (
              <div className="absolute top-2 right-2 text-primary-600">
                <Check className="w-5 h-5" />
              </div>
            )}
            <div className="aspect-[4/5] mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={theme.preview}
                alt={`${theme.name} theme preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-gray-900">{theme.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}