import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { servicesApi, projectsApi, testimonialsApi } from '../../lib/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    testimonials: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [services, projects, testimonials] = await Promise.all([
          servicesApi.getAll(),
          projectsApi.getAll(),
          testimonialsApi.getAll()
        ]);

        setStats({
          services: services.length,
          projects: projects.length,
          testimonials: testimonials.length
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const menuItems = [
    {
      title: 'Services',
      count: stats.services,
      link: '/admin/services',
      description: 'Manage your service offerings'
    },
    {
      title: 'Projects',
      count: stats.projects,
      link: '/admin/projects',
      description: 'Update your project portfolio'
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      link: '/admin/testimonials',
      description: 'Manage client testimonials'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Welcome, Admin</h1>
        <p className="text-text-muted mt-2">Manage your website content from here</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="block p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-primary-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">{item.title}</h2>
              <span className="text-2xl font-bold text-primary-500">{item.count}</span>
            </div>
            <p className="text-text-muted">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}