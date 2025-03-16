import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Exams', path: '/exams' },
    { id: 3, text: 'Mentors & Webinars', path: '/mentors-webinars' },
    { id: 4, text: 'Colleges', path: '/colleges' },
    { id: 5, text: 'GuideBot', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-white">CR</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                College Raahi
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {links.map(({ id, text, path }) => (
              <Link
                key={id}
                to={path}
                className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  location.pathname === path
                    ? 'text-primary dark:text-primary bg-primary/5 dark:bg-primary/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                }`}
              >
                {text}
                {location.pathname === path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setNav(!nav)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
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

      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-2 space-y-1">
              {links.map(({ id, text, path }) => (
                <Link
                  key={id}
                  to={path}
                  onClick={() => setNav(false)}
                  className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
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
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;