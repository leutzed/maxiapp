import './App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Athlete from './pages/Athlete'

function App() {
  return (
    <Router>
      <div className="app" style={{ margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/athlete/:id" element={<Athlete />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
