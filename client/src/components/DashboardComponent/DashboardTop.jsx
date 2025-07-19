import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { FiSearch, FiCamera } from 'react-icons/fi';
import Logo from '../../assets/Logo/CloudeskLogo.png'
import Avtar from '../../assets/AvtarImage/avtar.png'
import { LogoutButton } from '../index'


const DashboardTop = () => {

    const [isMenuOpen, setisMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        if (userData) {
            setUser({
                userImage: Avtar,
                name: userData.name,
                email: userData.email,
            });
        }
    }, [userData]);

    const toggleMenu = () => {
        setisMenuOpen(!isMenuOpen);
    }


    return (
        <div className='w-full top-0 sticky flex items-center justify-between px-3 md:px-8 py-5 gap-5'>

            <img src={Logo} alt="Cloudesk"
                className='h-6 md:h-8 w-auto'
            />

            <div className='flex items-center gap-4'>

                <div className="relative flex-grow w-full max-w-100">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-50 border border-gray-200 text-l outline-none transition-all"
                    />
                </div>

                <div className="relative flex-shrink-0">

                    <button
                        onClick={toggleMenu}
                        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-zinc-500 focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                    >
                        <img
                            src={user?.userImage || Avtar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </button>

                    <div
                        className={`absolute right-0 mt-3 w-72 bg-white p-6 border border-gray-100 rounded-xl shadow-xl z-50 transition-all duration-300 transform origin-top-right ${isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                            }`}
                    >
                        <div className="relative p-4 border-b border-gray-100 flex justify-center">
                            <div className="relative">
                                <img
                                    src={user?.userImage}
                                    alt="User"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                                />
                                <button
                                    onClick={() => alert("Change profile picture")}
                                    className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-blue-500 text-blue-600 hover:text-blue-700 shadow-md flex items-center justify-center cursor-pointer"
                                    style={{ transform: "translate(25%, 25%)" }}
                                    aria-label="Update profile picture"
                                >
                                    <FiCamera size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-lg font-semibold text-zinc-800">{user?.name}</p>
                            <p className="text-md text-zinc-600">{user?.email}</p>
                        </div>

                        <ul className="pt-6 text-md">
                            <li>
                                <LogoutButton onClose={() => setisMenuOpen(false)} />
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default DashboardTop