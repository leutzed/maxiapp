import './App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Athlete from './pages/Athlete'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AuthErrorHandler from './utils/AuthErrorHandler'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthErrorHandler />
        <div className="app" style={{ margin: 0, padding: 0 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/athlete/:id" 
              element={
                <ProtectedRoute>
                  <Athlete />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
