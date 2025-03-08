import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    project: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
    } else {
      setTestimonials(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (error) {
        console.error('Error saving testimonial:', error);
      }
    }

    setFormData({ name: '', role: '', content: '', project: '' });
    fetchTestimonials();
  }

  async function handleDelete(id) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchTestimonials();
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
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Project</label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <span className="ml-2 text-gray-500">- {testimonial.role}</span>
                  </div>
                  <p className="mt-2 text-gray-600 italic">"{testimonial.content}"</p>
                  <p className="mt-1 text-sm text-gray-500">Project: {testimonial.project}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-800"
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