import { create } from 'zustand';
import { Bill, Product, StoreState, UPIDetails } from '../types';
import { updateStockLevels, getStockAlerts } from '../utils/stockManagement';

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  bills: [],
  loading: false,
  selectedBillTheme: 'minimal',
  stockAlerts: [],
  upiDetails: null,
  
  // Products actions
  addProduct: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),
  
  updateProduct: (product: Product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  
  deleteProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  // Bills actions
  createBill: (bill: Bill) =>
    set((state) => {
      // Update stock levels
      const updatedProducts = updateStockLevels(state.products, bill);
      
      // Get new stock alerts
      const stockAlerts = getStockAlerts(updatedProducts);

      return {
        bills: [...state.bills, bill],
        products: updatedProducts,
        stockAlerts
      };
    }),

  // Theme actions
  setSelectedBillTheme: (themeId: string) => 
    set({ selectedBillTheme: themeId }),

  // UPI actions
  updateUpiDetails: (details: UPIDetails) => 
    set({ upiDetails: details }),

  // Stats calculation
  getDashboardStats: () => {
    const state = get();
    const totalSales = state.bills.reduce((sum, bill) => sum + bill.total, 0);
    const netProfitMargin = 15.5;
    
    return {
      totalSales,
      netProfitMargin,
    };
  },
}));