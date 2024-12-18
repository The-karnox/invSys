import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Layout/Sidebar';
import { MobileNav } from './Layout/MobileNav';

export function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 md:p-8 pb-16 md:pb-8">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}