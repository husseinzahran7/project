import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const features = formData.features.split('\n').filter(f => f.trim());

    if (editingId) {
      const { error } = await supabase
        .from('services')
        .update({
          title: formData.title,
          description: formData.description,
          features
        })
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([{
          title: formData.title,
          description: formData.description,
          features
        }]);

      if (error) {
        console.error('Error saving service:', error);
      }
    }

    setFormData({ title: '', description: '', features: '' });
    fetchServices();
  }

  async function handleDelete(id) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchServices();
    }
  }

  function handleEdit(service) {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features.join('\n')
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {services.map((service) => (
            <li key={service.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-1 text-gray-600">{service.description}</p>
                  <ul className="mt-2 list-disc list-inside">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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