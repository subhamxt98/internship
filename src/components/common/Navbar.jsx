import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './css/navbar.css'
import logo from '../../assets/banner.jpeg'   // ✅ same banner as logo

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
            <img src={logo} alt="ANSHIÉ's GLAM" />
          </div>
          <div className="ishani-logo-text d-none d-md-flex">
            <span className="ishani-brand">ANSHIÉ's</span>
            <span className="ishani-tagline">GLAM</span>
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

          {/* Cart — hover pe "View Cart" tooltip */}
          <Link to="/cart" className="ishani-cart-btn" data-tooltip="View Cart">
            <i className="bi bi-bag-heart"></i>
            {cartCount > 0 && (
              <span className="ishani-cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* ===== AUTH ===== */}
          {isAuthenticated ? (
            /* ✅ Login ho gaya — sirf user avatar (auth icons hat gaye) */
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
          ) : (
            /* ❌ Login nahi — Sign In / Sign Up white icons (hover pe text) */
            <div className="ishani-auth-icons">
              <Link
                to="/login"
                className="ishani-auth-icon signin"
                data-tooltip="Sign In"
              >
                <i className="bi bi-box-arrow-in-right"></i>
              </Link>
              <Link
                to="/login"
                className="ishani-auth-icon signup"
                data-tooltip="Sign Up"
              >
                <i className="bi bi-person-plus"></i>
              </Link>
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

            {/* Mobile auth buttons (jab login nahi) */}
            {!isAuthenticated && (
              <div className="ishani-mobile-auth">
                <Link to="/login" className="ishani-mobile-auth-btn signin">
                  <i className="bi bi-box-arrow-in-right"></i> Sign In
                </Link>
                <Link to="/login" className="ishani-mobile-auth-btn signup">
                  <i className="bi bi-person-plus"></i> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar