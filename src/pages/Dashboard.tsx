import React from 'react';
import { IndianRupee, Package, TrendingUp, Calculator } from 'lucide-react';
import { KPICard } from '../components/Dashboard/KPICard';
import { SalesChart } from '../components/Dashboard/SalesChart';
import { DemandForecast } from '../components/Dashboard/DemandForecast';
import { useStore } from '../store/useStore';
import { LoadingShimmer } from '../components/LoadingShimmer';

export function Dashboard() {
  const { loading } = useStore();
  const stats = useStore((state) => state.getDashboardStats());
  const totalItems = useStore((state) => 
    state.products.reduce((sum, product) => sum + product.stock, 0)
  );
  const averageOrderValue = useStore((state) => {
    const { bills } = state;
    if (bills.length === 0) return 0;
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);
    return totalRevenue / bills.length;
  });

  if (loading) {
    return <LoadingShimmer />;
  }

  return (
    <div className="space-y-6 pb-16">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Sales Amount"
          value={stats.totalSales}
          icon={<IndianRupee className="w-6 h-6 text-primary-600" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Total Items in Stock"
          value={totalItems}
          icon={<Package className="w-6 h-6 text-primary-600" />}
        />
        <KPICard
          title="Net Profit Margin"
          value={`${stats.netProfitMargin.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          title="Average Order Value"
          value={averageOrderValue}
          icon={<Calculator className="w-6 h-6 text-primary-600" />}
          trend={{ value: 5.8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <DemandForecast />
      </div>
    </div>
  );
}