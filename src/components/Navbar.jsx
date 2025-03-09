import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ backgroundColor: 'rgba(64, 64, 64, 0)' }}
      animate={{
        backgroundColor: scrolled ? 'rgba(51, 51, 51, 0.9)' : 'rgba(64, 64, 64, 0)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(248, 250, 252, 0.1)' : 'none',
      }}
      transition={{ duration: 0.3 }}
      className="fixed w-full top-0 z-50"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold text-primary-500">
              Mohammad Zahran Est.
            </Link>
          </motion.div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-base font-medium text-text-primary hover:text-primary-500 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: navigation.length * 0.1 }}
            >
              <Link
                to="/request-quote"
                className="btn-primary"
              >
                Request Quote
              </Link>
            </motion.div>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-card backdrop-blur-sm rounded-b-lg shadow-lg"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-primary-500/10 hover:text-primary-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/request-quote"
              className="block w-full text-center btn-primary mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}