import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  ChartBarIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/admin/services', label: 'Services', icon: WrenchScrewdriverIcon },
    { path: '/admin/projects', label: 'Projects', icon: BriefcaseIcon },
    { path: '/admin/testimonials', label: 'Testimonials', icon: UserGroupIcon }
  ];

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-card backdrop-blur-sm shadow-lg border-r border-primary-500/20"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="p-6"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-primary-500">
            Admin Dashboard
          </h2>
        </motion.div>
        <nav className="mt-6 px-4">
          {navigationItems.map((item) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-500 text-text-primary shadow-md'
                    : 'text-text-muted hover:bg-primary-500/10 hover:text-primary-500'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-primary-500/20"
          >
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-text-muted hover:bg-primary-500/10 hover:text-primary-500 transition-all"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
              Logout
            </button>
          </motion.div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="flex-1 p-8 overflow-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}