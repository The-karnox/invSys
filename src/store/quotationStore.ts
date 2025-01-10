import { create } from 'zustand';
import { Quotation } from '../types/quotation';

interface QuotationStore {
  quotations: Quotation[];
  addQuotation: (quotation: Quotation) => void;
  updateQuotation: (quotation: Quotation) => void;
  deleteQuotation: (id: string) => void;
}

export const useQuotationStore = create<QuotationStore>((set) => ({
  quotations: [],
  addQuotation: (quotation) =>
    set((state) => ({ quotations: [...state.quotations, quotation] })),
  updateQuotation: (quotation) =>
    set((state) => ({
      quotations: state.quotations.map((q) =>
        q.id === quotation.id ? quotation : q
      ),
    })),
  deleteQuotation: (id) =>
    set((state) => ({
      quotations: state.quotations.filter((q) => q.id !== id),
    })),
}));