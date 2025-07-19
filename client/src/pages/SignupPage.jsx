import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo/CloudeskLogo.png';
import axiosInstance from '../utils/axios/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../app/userSlice'
import { useDispatch } from 'react-redux';

const SignupPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      console.log(response.data);

      if (response && response.data?.user) {
        dispatch(authLogin({ userData: response.data.user }))
        reset();
        navigate('/dashboard');
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup failed");
    }

  };

  const handleGoogleSignup = () => {
    alert('Redirecting to Google Auth...');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-white to-[#e0e7ff] overflow-hidden px-4 py-10">

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-12 left-12 flex items-center justify-center w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 text-gray-800 hover:bg-white/30"
      >
        <FiArrowLeft className="text-xl" />
      </Link>

      {/* Background Blob */}
      <div className="custom-shape-divider-bottom-1752691034">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl rounded-md shadow-sm p-8 border border-white/30">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Cloudesk" className="h-8" />
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-800 mb-6 tracking-tight">
          Create account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register('name', { required: 'Name is required' })}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder-gray-500 text-sm"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format'
              }
            })}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder-gray-500 text-sm"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder-gray-500 text-sm"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium py-3 rounded-md text-sm transition disabled:opacity-70"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-400 text-xs uppercase">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Sign in */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-2.5 rounded-md bg-white text-gray-700 text-sm font-medium transition"
        >
          <FcGoogle size={18} />
          Continue with Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium transition">Log in</Link>
        </div>

      </div>

    </div>
  );
};

export default SignupPage;
