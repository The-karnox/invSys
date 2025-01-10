import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, Settings, FileSpreadsheet, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FileText, label: 'Bills', path: '/bills' },
    { icon: FileSpreadsheet, label: 'Quotations', path: '/quotations' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={clsx(
      "hidden md:flex bg-white shadow-lg flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div
  className={clsx(
    "p-4 flex items-center transition-all duration-300",
    isCollapsed ? "justify-center" : "justify-between"
  )}
>
  {!isCollapsed && (
    <h1 className="font-bold text-2xl text-primary-600">
      CloudLedger
    </h1>
  )}
  <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="text-gray-500 hover:text-gray-700 transition-colors"
  >
    {isCollapsed ? (
      <PanelRightClose className="w-5 h-5" />
    ) : (
      <PanelRightOpen className="w-5 h-5" />
    )}
  </button>
</div>

      <nav className="mt-8 px-2 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
  key={path}
  to={path}
  className={clsx(
    "flex px-4 py-3 rounded-lg transition-colors items-center",
    isCollapsed ? "justify-center" : "gap-4",
    isActive 
      ? "bg-primary-600 text-white hover:bg-primary-700" 
      : "text-gray-700 hover:bg-gray-100"
  )}
  title={isCollapsed ? label : undefined}
>
  <Icon className="w-5 h-5" />
  {!isCollapsed && <span>{label}</span>}
</Link>

          );
        })}
      </nav>
    </aside>
  );
}