import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './Routes/MainRoutes'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
