export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  reorderPoint: number;
  gstRate?: number; // Optional GST rate per product
}

export interface BillItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  gstAmount?: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  customerName: string;
  customerPhone: string;
  items: BillItem[];
  total: number;
  date: Date;
  paymentType: 'online' | 'cash';
  isGstBill: boolean;
  gstNumber?: string;
  totalGst?: number;
}

export interface DashboardStats {
  totalSales: number;
  totalBills: number;
  netProfitMargin: number;
  topProducts: Product[];
}

export interface ReorderAlert {
  productId: string;
  currentStock: number;
  reorderPoint: number;
}

export interface ImportedProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  reorderPoint: number;
  gstRate?: number;
}