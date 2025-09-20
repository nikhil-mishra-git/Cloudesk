import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiFolder,
    FiStar,
    FiTrash2
} from 'react-icons/fi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { UploadButton } from '../../components'

const navItems = [
    {
        name: 'All Files',
        to: '/dashboard',
        icon: FiFolder,
    },
    {
        name: 'Starred',
        to: '/dashboard/starred',
        icon: FiStar,
    },
    {
        name: 'Trash',
        to: '/dashboard/trash',
        icon: FiTrash2,
    }
];

const DashboardSidebar = () => {
    return (
        <aside className="w-fit md:w-64 h-full bg-white shadow-sm rounded-3xl px-3 md:px-6 py-8 flex flex-col justify-between border border-gray-100">
            <div>
                <div className="flex items-center gap-3 mb-6 px-3 md:px-4 pb-4">
                    <TbLayoutDashboard className="text-blue-600 text-lg md:text-2xl" />
                    <h2 className="hidden md:block text-2xl font-semibold text-zinc-600">Overview</h2>
                </div>

                <UploadButton className="mb-4 w-full" />

                <nav className="space-y-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isEnd = item.to === '/dashboard';

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={isEnd}
                                className={({ isActive }) => {
                                    return `flex items-center gap-3 w-full px-3 md:px-5 py-3 md:py-4 rounded-lg text-sm font-semibold transition duration-200 ease-in-out ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`
                                }}

                            >
                                <Icon className={`text-lg ${item.color}`} />
                                <span className='hidden md:block'>{item.name}</span>
                            </NavLink>

                        );
                    })}
                </nav>

            </div>

            <div className="text-xs mt-10 text-gray-400 text-center pt-6 border-t border-gray-100 hidden md:block">
                © 2025 Cloudesk
            </div>
        </aside>
    );
};

export default DashboardSidebar;
