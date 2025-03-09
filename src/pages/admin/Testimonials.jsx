import { useState, useEffect } from 'react';
import { testimonialsApi } from '../../lib/api';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    project: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const data = await testimonialsApi.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await testimonialsApi.update(editingId, formData);
      } else {
        await testimonialsApi.create(formData);
      }

      setFormData({ name: '', role: '', content: '', project: '' });
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await testimonialsApi.delete(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  }

  function handleEdit(testimonial) {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      project: testimonial.project
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Manage Testimonials</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted">Client Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Role/Company</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Project Name</label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Testimonial Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (editingId ? 'Update Testimonial' : 'Add Testimonial')}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-card rounded-lg shadow-md">
        <ul className="divide-y divide-primary-500/20">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">{testimonial.name}</h3>
                    <span className="text-sm text-primary-500">
                      {testimonial.role}
                    </span>
                  </div>
                  <p className="mt-2 text-text-muted italic">"{testimonial.content}"</p>
                  <p className="mt-1 text-sm text-text-muted">Project: {testimonial.project}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-primary-500 hover:text-primary-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-primary-500 hover:text-primary-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}