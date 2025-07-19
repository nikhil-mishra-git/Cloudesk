import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PrivateRoute } from './components'
import { HomePage, DashboardPage, LoginPage, SignupPage, MyFilesPage, StarredPage, TrashPage, NotFoundPage } from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index element={<HomePage />} />
      <Route path='login' element={<PrivateRoute authentication={false}> <LoginPage /> </PrivateRoute>} />
      <Route path='signup' element={<PrivateRoute authentication={false}> <SignupPage /> </PrivateRoute>} />

      <Route path="/dashboard" element={<PrivateRoute authentication={true}> <DashboardPage /> </PrivateRoute>}>
        <Route index element={<PrivateRoute authentication={true}> <MyFilesPage /> </PrivateRoute>} />
        <Route path="starred" element={<PrivateRoute authentication={true}> <StarredPage /> </PrivateRoute>} />
        <Route path="trash" element={<PrivateRoute authentication={true}> <TrashPage /> </PrivateRoute>} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
