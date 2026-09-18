// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import About from './pages/About'                    // ✅ About
import Contact from './pages/Contact'                // ✅ Contact
import CartPage from './pages/CartPage'              // ✅ Cart
import OrderSuccessPage from './pages/OrderSuccessPage'  // ✅ Order Success
import LoginPage from './pages/LoginPage'            // ✅ Login
import RegisterPage from './pages/RegisterPage'      // ✅ Register

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
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />                     {/* ✅ Cart route */}
          <Route path="/order-success" element={<OrderSuccessPage />} />    {/* ✅ Order Success route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App