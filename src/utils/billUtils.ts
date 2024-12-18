import { format } from 'date-fns';
import { BillItem, Product } from '../types';

export const generateBillNumber = (sequence: number): string => {
  const date = new Date();
  const formattedDate = format(date, 'ddMM');
  const sequenceNumber = String(sequence).padStart(2, '0');
  return `INV-${formattedDate}-${sequenceNumber}`;
};

export const calculateNetProfitMargin = (revenue: number, costs: number): number => {
  if (revenue === 0) return 0;
  return ((revenue - costs) / revenue) * 100;
};

export const calculateGST = (item: BillItem, product: Product): { gstAmount: number; totalWithGst: number } => {
  const gstRate = product.gstRate || 0;
  const gstAmount = (item.subtotal * gstRate) / 100;
  const totalWithGst = item.subtotal + gstAmount;
  
  return { gstAmount, totalWithGst };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};