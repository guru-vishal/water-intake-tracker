import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">Water Intake Tracker</h1>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;