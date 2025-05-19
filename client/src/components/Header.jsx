import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { authenticatedUser, signOut } = useAuth();

  return (
    
<header className="header">
  <div className="wrap header--flex">
    <Link to="/" className="header--logo">
      <h1>Courses</h1>
    </Link>
    <nav>
      {authenticatedUser ? (
        <ul className="header--signedin">
          <li>Welcome, {authenticatedUser.firstName}</li>
          <li><button onClick={signOut}>Sign Out</button></li>
        </ul>
      ) : (
        <ul className="header--signedout">
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      )}
    </nav>
  </div>
</header>
  );
};

export default Header;