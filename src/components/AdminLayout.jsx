import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/services"
            className="block px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
          >
            Services
          </Link>
          <Link
            to="/admin/projects"
            className="block px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
          >
            Projects
          </Link>
          <Link
            to="/admin/testimonials"
            className="block px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
          >
            Testimonials
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}