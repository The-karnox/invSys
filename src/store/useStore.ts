import { create } from 'zustand';
import { Product, Bill, DashboardStats } from '../types';
import { calculateNetProfitMargin } from '../utils/billUtils';

interface StoreState {
  products: Product[];
  bills: Bill[];
  loading: boolean;
  addProduct: (product: Product) => void;
  addProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  createBill: (bill: Bill) => void;
  updateProductStock: (productId: string, quantity: number) => void;
  getDashboardStats: () => DashboardStats;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  bills: [],
  loading: false,
  
  addProduct: (product) => 
    set((state) => ({ products: [...state.products, product] })),
    
  addProducts: (products) =>
    set((state) => ({ products: [...state.products, ...products] })),
    
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => 
        p.id === product.id ? product : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
    
  createBill: (bill) => {
    set((state) => {
      // Update stock for each item in the bill
      bill.items.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (product) {
          const updatedStock = product.stock - item.quantity;
          state.products = state.products.map(p =>
            p.id === product.id ? { ...p, stock: updatedStock } : p
          );
        }
      });
      
      return { 
        bills: [...state.bills, bill],
        products: state.products
      };
    });
  },

  updateProductStock: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - quantity } : p
      ),
    })),
    
  getDashboardStats: () => {
    const { bills } = get();
    const totalSales = bills.reduce((sum, bill) => sum + bill.total, 0);
    const totalCosts = bills.reduce((sum, bill) => {
      // Assuming a 30% cost on each sale for demonstration
      return sum + (bill.total * 0.7);
    }, 0);
    
    return {
      totalSales,
      totalBills: bills.length,
      netProfitMargin: calculateNetProfitMargin(totalSales, totalCosts),
      topProducts: [],
    };
  },

  setLoading: (loading) => set({ loading }),
}));