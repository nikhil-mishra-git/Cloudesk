import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiFolder,
  FiStar,
  FiTrash2,
  FiX
} from 'react-icons/fi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { UploadButton } from '../../components';

const navItems = [
  { name: 'All Files', to: '/dashboard', icon: FiFolder },
  { name: 'Starred', to: '/dashboard/starred', icon: FiStar },
  { name: 'Trash', to: '/dashboard/trash', icon: FiTrash2 }
];

const DashboardSidebar = ({ isSidebarOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isSidebarOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={handleOverlayClick}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 bg-white w-64 rounded-3xl sm:relative sm:w-64 h-full px-6 py-8 flex flex-col justify-between border-r border-gray-100 shadow transition-transform duration-300 sm:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:flex`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6 px-3 pb-4 border-b border-gray-100">
            <TbLayoutDashboard className="text-blue-600 text-2xl" />
            <h2 className="text-xl font-semibold text-zinc-600">Overview</h2>
          </div>

          <UploadButton className="mb-6 w-full" />

          <nav className="space-y-2">
            {navItems.map(({ to, name, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                onClick={() => window.innerWidth < 640 && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="text-lg" />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="text-xs text-gray-400 text-center pt-6 border-t border-gray-100">
          © 2025 Cloudesk
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
