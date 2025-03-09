import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { adminApi } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(true); // Set default to true
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAdminExists();
  }, []);

  async function checkAdminExists() {
    try {
      const { count, error } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }
      
      console.log('Admin check result:', { count });
      setIsInitialSetup(count === 0);
    } catch (err) {
      console.error('Error in checkAdminExists:', err);
      setError('Error checking admin status: ' + err.message);
    }
  }

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      
      if (isInitialSetup) {
        console.log('Creating initial admin user...');
        await adminApi.initializeAdmin(email, password);
        console.log('Admin user created, logging in...');
        await login(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('Failed to sign in: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border border-primary-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-center text-text-primary">
            {isInitialSetup ? 'Initial Admin Setup' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-center text-text-muted">
            {isInitialSetup 
              ? 'Create your admin account to get started'
              : 'Sign in to access the admin dashboard'}
          </p>
        </div>

        {error && (
          <motion.div 
            className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-text-primary placeholder:text-text-muted/50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-primary-500/20 bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-text-primary placeholder:text-text-muted/50 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              isInitialSetup ? 'Create Admin Account' : 'Sign in'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}