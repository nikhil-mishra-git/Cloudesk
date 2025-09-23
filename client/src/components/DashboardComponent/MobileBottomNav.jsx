import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiFolder, FiStar, FiTrash2 } from 'react-icons/fi';

const navItems = [
  { name: 'All Files', to: '/dashboard', icon: FiFolder },
  { name: 'Starred', to: '/dashboard/starred', icon: FiStar },
  { name: 'Trash', to: '/dashboard/trash', icon: FiTrash2 }
];

const MobileBottomNav = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Detect active tab index based on location
    const index = navItems.findIndex(item =>
      location.pathname === item.to ||
      (item.to !== '/dashboard' && location.pathname.startsWith(item.to))
    );
    setActiveIndex(index === -1 ? 0 : index);
  }, [location.pathname]);

  useEffect(() => {
    // Dynamically get width of each nav item
    if (containerRef.current) {
      const navItem = containerRef.current.querySelector('a');
      if (navItem) {
        setItemWidth(navItem.offsetWidth);
      }
    }
  }, [containerRef.current, window.innerWidth]);

  return (
    <nav
      ref={containerRef}
      className="sm:hidden fixed bottom-1 left-4 right-4 rounded-2xl border border-gray-100 z-40 p-2 backdrop-blur-sm overflow-hidden"
    >
      {/* Sliding background */}
      <div
        className="absolute top-2 bottom-2 left-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-md z-0 transition-transform duration-300 ease-in-out"
        style={{
          width: `${itemWidth}px`,
          transform: `translateX(${activeIndex * itemWidth}px)`
        }}
      />

      {/* Nav items */}
      <div className="relative flex justify-evenly z-10">
        {navItems.map(({ to, name, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all duration-300 ease-in-out ${
                isActive ? 'text-white' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={16}
                  className={`transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 font-medium transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  {name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
