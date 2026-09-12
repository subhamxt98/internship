import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'   // ✅ Shop page import

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#050505'
    }}>
      <Navbar />
      <main style={{ flex: 1, background: '#050505' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />   {/* ✅ Shop route */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App