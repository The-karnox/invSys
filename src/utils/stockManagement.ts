import { Product, Bill } from '../types';

export function updateStockLevels(products: Product[], bill: Bill): Product[] {
  return products.map(product => {
    const billItem = bill.items.find(item => item.productId === product.id);
    if (!billItem) return product;

    const newStock = product.stock - billItem.quantity;
    return {
      ...product,
      stock: newStock
    };
  });
}

export function getStockAlerts(products: Product[]): { id: string; name: string; stock: number; reorderPoint: number }[] {
  return products
    .filter(product => product.stock <= product.reorderPoint)
    .map(({ id, name, stock, reorderPoint }) => ({
      id,
      name,
      stock,
      reorderPoint
    }));
}