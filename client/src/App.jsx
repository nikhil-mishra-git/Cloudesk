import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './utils/axios/axiosInstance';
import { authLogin } from './app/userSlice';
import { setFiles } from './app/fileSlice';
import { CloudLoader } from './components';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile');
        if (res.data?.user) {
          dispatch(authLogin({ userData: res.data.user }));

          const filesRes = await axiosInstance.get('/files');
          dispatch(setFiles(filesRes.data.files));
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn && (location.pathname === '/' || location.pathname === '/login')) {
        navigate('/dashboard');
      } else if (!isLoggedIn && location.pathname.startsWith('/dashboard')) {
        navigate('/');
      }
    }
  }, [isLoggedIn, location.pathname, navigate, loading]);

  if (loading) {
    return <CloudLoader />;
  }

  return (
    <div>
      <>
        <Toaster position="top-center" reverseOrder={false} />
      </>
      <Outlet />
    </div>
  );
};

export default App;
