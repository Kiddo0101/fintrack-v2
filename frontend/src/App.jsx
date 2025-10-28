import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DvList from './pages/DvList'
import CreateDv from './pages/CreateDv'
import DvDetail from './pages/DvDetail'
import Layout from './components/Layout'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="dvs" element={<DvList />} />
            <Route path="dvs/create" element={<CreateDv />} />
            <Route path="dvs/:id" element={<DvDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
