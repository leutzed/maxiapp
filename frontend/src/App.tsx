import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { AthletesProvider } from './contexts/AthletesContext'

function App() {
  return (
    <AuthProvider>
      <AthletesProvider>
        {/* Your app routes and components will go here */}
      </AthletesProvider>
    </AuthProvider>
  )
}

export default App
