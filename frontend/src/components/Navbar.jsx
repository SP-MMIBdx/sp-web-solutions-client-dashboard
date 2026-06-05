import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Workspace</h1>
      </div>
      <div className="flex items-center space-x-6">
        {user && (
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-700 leading-none">{user.email}</p>
              <p className="text-xs text-gray-400 capitalize mt-1">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Log out"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
