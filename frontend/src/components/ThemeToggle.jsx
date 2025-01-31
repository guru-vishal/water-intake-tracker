import React from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme');
  };

  return (
    <button
      className="btn btn-outline-light"
      onClick={toggleTheme}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;