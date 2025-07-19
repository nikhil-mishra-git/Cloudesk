import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiArrowRightCircle } from "react-icons/fi";
import { AiFillFilePdf, AiFillFileZip } from "react-icons/ai";
import { FaFileImage, FaFileAlt, FaFileCode } from "react-icons/fa";
import { FiShield, FiCode, FiGlobe } from "react-icons/fi";
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

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CloudLoader />;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-slate-200 overflow-hidden">

      {/* Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-30 blur-[120px] z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-400 rounded-full opacity-30 blur-[120px] z-0"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-12 py-6 backdrop-blur-md mx-6 mt-6">
        <img src={Logo} alt="Cloudesk Logo" className="w-48 object-contain drop-shadow-md" />
        <div className="flex gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 text-l font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md backdrop-blur-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 shadow-md"
          >
            <FiLogIn className="text-white text-xl" />
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section + Category Section */}
      <main className="relative z-10 flex flex-col items-center justify-start pt-16 min-h-[calc(100vh-90px)] text-center px-6 pb-24">

        <>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Securely Store, Share & Access <br className="hidden md:block" /> Your Files Anywhere
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-10">
            Cloudesk makes it super easy to store, manage and access your files from anywhere securely and quickly.
          </p>
          <Link
            to="/signup"
            className="flex items-center gap-3 px-10 py-4 text-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md backdrop-blur-md shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 mb-16"
          >
            Get Started Free
            <FiArrowRightCircle className="text-white text-2xl" />
          </Link>

        </>

        {/* File Categories Embedded Below Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mt-2 gap-6">
          {fileCategories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300"
            >
              <div className="text-4xl mb-2 text-white p-5 transition-transform rounded-xl hover:scale-106 duration-200 bg-white/50 border border-white/30 
                 backdrop-blur-md">
                {category.icon}
              </div>
              <p className="text-sm text-black drop-shadow">{category.label}</p>
            </div>
          ))}
        </div>

        <section className="py-30 px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Why Choose Cloudesk?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine privacy, openness, and global flexibility — all with a modern design that puts you in control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
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
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-md p-8 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white border-white/30 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>



      </main>
    </div>
  );
};

export default HomePage;
