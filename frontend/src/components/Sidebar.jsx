import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, FileText } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', path: '/clients', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Invoices', path: '/invoices', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#292661] text-white flex flex-col h-screen shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[#3c3882]">
        <span className="text-lg font-bold tracking-wider uppercase">SP Web Solutions</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#3c3882] text-white'
                  : 'text-gray-300 hover:bg-[#3c3882]/50 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[#3c3882] text-xs text-gray-400 text-center">
        v1.0.0 &copy; 2026
      </div>
    </aside>
  );
};

export default Sidebar;
