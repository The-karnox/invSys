export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  reorderPoint: number;
}

export interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface UPIDetails {
  payeeName: string;
  upiId: string;
  qrCode?: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  customerName: string;
  customerPhone: string;
  date: Date;
  items: BillItem[];
  total: number;
  paymentType: 'cash' | 'online';
  gst?: number;
  gstNumber?: string;
  upiDetails?: UPIDetails;
  businessName?: string;
  businessAddress?: string;
  panNumber?: string;
}

export interface StockAlert {
  id: string;
  name: string;
  stock: number;
  reorderPoint: number;
}

export interface StoreState {
  products: Product[];
  bills: Bill[];
  loading: boolean;
  selectedBillTheme: string;
  stockAlerts: StockAlert[];
  upiDetails: UPIDetails | null;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  createBill: (bill: Bill) => void;
  setSelectedBillTheme: (themeId: string) => void;
  updateUpiDetails: (details: UPIDetails) => void;
  getDashboardStats: () => { totalSales: number; netProfitMargin: number };
}