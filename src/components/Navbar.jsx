import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const links = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Exams', path: '/exams' },
    { id: 3, text: 'Mentors', path: '/mentors' },
    { id: 4, text: 'Webinars', path: '/webinars' },
    { id: 5, text: 'Colleges', path: '/colleges' },
    { id: 6, text: 'Contact', path: '/contact' },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                EduHub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map(({ id, text, path }) => (
              <Link
                key={id}
                to={path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-primary dark:text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {text}
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-primary bottom-0"
                  />
                )}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FaMoon className="text-gray-600 w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FaMoon className="text-gray-600 w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setNav(!nav)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none"
            >
              {nav ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: nav ? 1 : 0, y: nav ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={`${
          nav ? 'block' : 'hidden'
        } md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(({ id, text, path }) => (
            <Link
              key={id}
              to={path}
              onClick={() => setNav(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === path
                  ? 'bg-primary/5 dark:bg-primary/10 text-primary'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {text}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;