import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome message when user logs in
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000); // 10 seconds

      // Cleanup timer if component unmounts or user changes
      return () => clearTimeout(timer);
    }
  }, [user]); // Re-run when user changes (logs in/out)

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-brand'>ShopHub</Link>
        <div className='navbar-links'>
          <Link className='navbar-link' to='/'>Home</Link>
          <Link className='navbar-link' to='/checkout'>Cart</Link>
        </div>
        <div className='navbar-auth'>
          {user ? (
            // Show when user is logged in
            <div className="navbar-user">
              {showWelcome && (
                <span className="user-welcome-message">
                  Welcome, {user.email}!
                </span>
              )}
              <button 
                onClick={handleLogout} 
                className='btn btn-secondary'
              >
                Logout
              </button>
            </div>
          ) : (
            // Show when user is not logged in
            <div className="navbar-auth-links">
              <Link to='/auth' state={{ mode: 'login' }} className='btn btn-secondary'>
                Login
              </Link>
              <Link to='/auth' state={{ mode: 'signup' }} className='btn btn-primary'>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;