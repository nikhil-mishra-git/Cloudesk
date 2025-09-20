import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiArrowRightCircle, FiShield, FiCode, FiGlobe } from "react-icons/fi";
import { AiFillFilePdf, AiFillFileZip } from "react-icons/ai";
import { FaFileImage, FaFileCode } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { RiFileWord2Fill } from "react-icons/ri";
import { CloudLoader } from '../components';
import Logo from '../assets/Logo/CloudeskLogo.png';

const fileCategories = [
  { label: "Documents", icon: <MdDescription className="text-blue-600" /> },
  { label: "PDF", icon: <AiFillFilePdf className="text-red-500" /> },
  { label: "JPEG", icon: <FaFileImage className="text-green-500" /> },
  { label: "DOCX", icon: <RiFileWord2Fill className="text-blue-700" /> },
  { label: "ZIP", icon: <AiFillFileZip className="text-orange-500" /> },
  { label: "TEXT", icon: <FaFileCode className="text-gray-700" /> },
];

const features = [
  {
    icon: <FiShield className="text-4xl" />,
    title: "Advanced Security",
    desc: "Your files are protected with enterprise-grade encryption, ensuring complete privacy and control.",
  },
  {
    icon: <FiCode className="text-4xl" />,
    title: "Transparent & Open",
    desc: "Our open-source core lets anyone audit our code, ensuring full transparency and trust.",
  },
  {
    icon: <FiGlobe className="text-4xl" />,
    title: "Global Availability",
    desc: "No matter where you are, Cloudesk offers secure, lightning-fast access across all devices.",
  },
];

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CloudLoader />;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white via-gray-100 to-slate-200 overflow-hidden">

      {/* Gradient Background Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-30 blur-[120px] z-0"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400 rounded-full opacity-30 blur-[120px] z-0"></div>

      {/* Header */}
      <header className="relative z-10 flex flex-row justify-between items-center px-6 sm:px-12 py-4 sm:py-6 backdrop-blur-md mt-4 sm:mt-6">
        <img src={Logo} alt="Cloudesk Logo" className="w-36 sm:w-48 object-contain drop-shadow-md" />
        <Link
          to="/login"
          className="flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition"
        >
          <FiLogIn className="text-white text-xl" />
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-6 pt-12 pb-14 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Securely Store, Share & Access <br className="hidden md:block" /> Your Files Anywhere
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mb-10">
          Cloudesk makes it super easy to store, manage and access your files from anywhere securely and quickly.
        </p>
        <Link
          to="/signup"
          className="flex items-center gap-3 px-4 md:px-8 py-3 text-sm md:text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md shadow-lg hover:shadow-2xl transition mb-16"
        >
          Get Started Free
          <FiArrowRightCircle className="text-xl md:text-2xl" />
        </Link>

        {/* File Categories */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-6 mb-16">
          {fileCategories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center justify-center p-1 md:p-4 transition duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-2 p-4 bg-white/50 border border-white/30 backdrop-blur-md rounded-xl hover:scale-105 transition-transform">
                {category.icon}
              </div>
              <p className="text-xs md:text-sm text-black">{category.label}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <section className="w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">Why Choose Cloudesk?</h2>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mb-10">
              We combine privacy, openness, and global flexibility , all with a modern design that puts you in control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-md p-6 sm:p-8 shadow-sm transition duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-xl px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-gray-300 mb-6" />
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Cloudesk. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default HomePage;
