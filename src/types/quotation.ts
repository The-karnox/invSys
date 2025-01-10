export interface PaymentTerm {
  id: string;
  type: 'predefined' | 'custom';
  description: string;
  percentage: number;
  conditions?: string;
}

export interface QuotationItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  date: Date;
  // Business Information
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  // Vendor Information
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  vendorAddress: string;
  // Items and Totals
  items: QuotationItem[];
  total: number;
  // Delivery Information
  deliveryAddress: string;
  expectedDeliveryDate?: Date;
  // Payment Details
  paymentTerms: PaymentTerm[];
  // Additional Information
  specialInstructions?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}