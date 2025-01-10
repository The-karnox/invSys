import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { Quotation } from '../types/quotation';
import { Product } from '../types';

export const generateQuotationPDF = (quotation: Quotation, products: Product[]): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.text(quotation.quotationNumber, 20, 30);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Date: ${format(quotation.date, 'dd MMMM yyyy')}`, 20, 40);
  
  // Business & Vendor Details
  doc.setFontSize(12);
  doc.text('Business Details:', 20, 60);
  doc.text(quotation.businessName, 20, 70);
  doc.text(quotation.businessAddress, 20, 80);
  
  doc.text('Vendor Details:', 120, 60);
  doc.text(quotation.vendorName, 120, 70);
  doc.text(quotation.vendorPhone, 120, 80);
  
  // Items Table
  let y = 100;
  doc.setFontSize(10);
  doc.text('Description', 20, y);
  doc.text('Qty', 100, y);
  doc.text('Price', 140, y);
  doc.text('Amount', 170, y);
  
  y += 10;
  quotation.items.forEach((item) => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      doc.text(product.name, 20, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₹${item.price}`, 140, y);
      doc.text(`₹${item.subtotal}`, 170, y);
      y += 10;
    }
  });
  
  // Payment Terms
  y += 10;
  doc.text('Payment Terms:', 20, y);
  y += 10;
  quotation.paymentTerms.forEach((term) => {
    doc.text(`${term.description}: ${term.percentage}%`, 20, y);
    y += 10;
  });
  
  // Total
  doc.text(`Total Amount: ₹${quotation.total}`, 170, y, { align: 'right' });
  
  // Save
  doc.save(`${quotation.quotationNumber}.pdf`);
};