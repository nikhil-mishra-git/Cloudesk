import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../assets/Logo/CloudeskLogo.png';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-white to-[#e0e7ff] px-6 py-12 relative overflow-hidden text-center">

            {/* Gradient Blobs */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-400 opacity-25 rounded-full blur-[140px] z-0" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400 opacity-25 rounded-full blur-[140px] z-0" />

            {/* Logo */}
            <img src={Logo} alt="Cloudesk Logo" className="w-32 mb-8 z-10" />

            {/* Content */}
            <div className="z-10 max-w-lg w-full px-8 py-12 bg-white/20 border border-white/30 rounded-2xl backdrop-blur-lg">

                <h1 className="text-7xl font-extrabold text-blue-700 mb-4">404</h1>
                <p className="text-gray-700 text-lg mb-8">
                    Sorry, we couldn’t find the page you were looking for.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-blue-700 font-medium px-6 py-3 border border-white/40 bg-white/30 backdrop-blur-md rounded-full transition hover:bg-white/40"
                >
                    <FiArrowLeft className="text-lg" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
