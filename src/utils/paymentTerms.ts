import { PaymentTerm } from '../types/quotation';

export const PREDEFINED_PAYMENT_TERMS = [
  {
    id: 'fifty-fifty',
    label: '50% Advance, 50% on Completion',
    terms: [
      { description: 'Advance Payment', percentage: 50 },
      { description: 'On Completion', percentage: 50 }
    ]
  },
  {
    id: 'thirty-seventy',
    label: '30% Advance, 70% Post-Delivery',
    terms: [
      { description: 'Advance Payment', percentage: 30 },
      { description: 'Post-Delivery', percentage: 70 }
    ]
  },
  {
    id: 'net-30',
    label: 'Net 30 (Full payment after 30 days)',
    terms: [
      { description: 'Net 30', percentage: 100 }
    ]
  },
  {
    id: 'net-60',
    label: 'Net 60 (Full payment after 60 days)',
    terms: [
      { description: 'Net 60', percentage: 100 }
    ]
  }
];

export const validatePaymentTerms = (terms: PaymentTerm[]): boolean => {
  const total = terms.reduce((sum, term) => sum + term.percentage, 0);
  return total === 100;
};