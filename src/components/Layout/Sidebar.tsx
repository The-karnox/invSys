import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FileText, label: 'Bills', path: '/bills' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary-600">CloudLedger</h1>
      </div>
      <nav className="mt-8">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                'flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50',
                isActive && 'bg-primary-50 text-primary-600'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}