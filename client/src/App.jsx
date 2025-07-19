import React, { useEffect, useState } from 'react'
import axiosInstance from './utils/axios/axiosInstance'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from './app/userSlice'
import { CloudLoader } from './components'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile')
        console.log(res.data);
        
        if (res.data?.user) {
          dispatch(authLogin({ userData: res.data.user }))
        }
      } catch (error) {
        console.log('User not logged in or session expired')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [dispatch])

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn && (location.pathname === '/' || location.pathname === '/login')) {
        navigate('/dashboard')
      } else if (!isLoggedIn && location.pathname.startsWith('/dashboard')) {
        navigate('/')
      }
    }
  }, [isLoggedIn, location.pathname, navigate, loading])

  if (loading) {
    return <CloudLoader />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
