import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';

function Menu() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link itemProp="url" to="/dashboard">Dashboard</Link></li>
            <li><Link itemProp="url" to="/summary">Summary</Link></li>
            <li><Link itemProp="url" to="/reports">Reports</Link></li>
            <li><button onClick={onLogout} aria-label="Log out">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Menu;
