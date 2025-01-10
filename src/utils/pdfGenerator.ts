import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { Bill, Product } from '../types';

export const generatePDF = (bill: Bill, products: Product[]): void => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(24);
  doc.text(bill.billNumber, 20, 30);
  
  // Date and Currency info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Due date: ${format(bill.date, 'dd MMMM yyyy')}`, 20, 40);
  
  doc.text('Currency', 140, 30);
  doc.setTextColor(0);
  doc.text('INR - Indian Rupee', 140, 40);
  
  // Customer Details
  doc.setTextColor(100);
  doc.text('Billed to:', 20, 60);
  doc.setTextColor(0);
  doc.text(bill.customerName, 20, 70);
  doc.text(bill.customerPhone, 20, 80);
  
  if (bill.isGstBill && bill.gstNumber) {
    doc.text(`GST: ${bill.gstNumber}`, 20, 90);
  }
  
  // Payment Details
  doc.setTextColor(100);
  doc.text('Payment Type:', 140, 60);
  doc.setTextColor(0);
  doc.text(bill.paymentType.toUpperCase(), 140, 70);
  
  // Table Header
  const tableTop = 110;
  doc.setFillColor(250, 250, 250);
  doc.rect(20, tableTop - 10, 170, 10, 'F');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('DESCRIPTION', 20, tableTop);
  doc.text('QTY', 100, tableTop);
  doc.text('UNIT PRICE', 130, tableTop);
  doc.text('AMOUNT', 160, tableTop);
  
  // Table Content
  let y = tableTop + 10;
  doc.setTextColor(0);
  
  bill.items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      doc.text(product.name, 20, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`₹${item.price.toLocaleString('en-IN')}`, 130, y);
      doc.text(`₹${item.subtotal.toLocaleString('en-IN')}`, 160, y);
      y += 10;
    }
  });
  
  // Totals
  y += 10;
  doc.text('Subtotal:', 130, y);
  doc.text(`₹${bill.total.toLocaleString('en-IN')}`, 160, y);
  
  if (bill.isGstBill && bill.totalGst) {
    y += 10;
    doc.text('GST:', 130, y);
    doc.text(`₹${bill.totalGst.toLocaleString('en-IN')}`, 160, y);
  }
  
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 130, y);
  doc.text(`₹${(bill.total + (bill.totalGst || 0)).toLocaleString('en-IN')}`, 160, y);
  
  // Save the PDF
  doc.save(`${bill.billNumber}.pdf`);
};