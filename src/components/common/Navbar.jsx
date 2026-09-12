import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './css/navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`ishani-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">

        {/* ===== LOGO ===== */}
        <Link to="/" className="ishani-logo">
          <div className="ishani-logo-img">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop&q=85"
              alt="ISHANI Cosmetics"
            />
          </div>
          <div className="ishani-logo-text d-none d-md-flex">
            <span className="ishani-brand">ISHANI</span>
            <span className="ishani-tagline">Cosmetics</span>
          </div>
        </Link>

        {/* ===== NAV LINKS ===== */}
        <div className="ishani-nav-links d-none d-lg-flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`ishani-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="ishani-right">

          {/* Cart */}
          <Link to="/cart" className="ishani-cart-btn">
            <i className="bi bi-bag"></i>
            {cartCount > 0 && (
              <span className="ishani-cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Auth — Sirf User Avatar (jab logged in) */}
          {isAuthenticated && (
            <div className="dropdown">
              <button
                className="ishani-user-btn"
                data-bs-toggle="dropdown"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end ishani-dropdown">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    <i className="bi bi-person"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="dropdown-item">
                    <i className="bi bi-box-seam"></i> My Orders
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item logout-item bg-transparent border-0 w-100 text-start"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="ishani-toggle d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div className="collapse d-lg-none" id="mobileNav">
        <div className="ishani-mobile-menu">
          <div className="ishani-mobile-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`ishani-mobile-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar