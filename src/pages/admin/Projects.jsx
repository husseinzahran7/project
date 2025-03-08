import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    details: '',
    image_url: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const details = formData.details.split('\n').filter(d => d.trim());

    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          details,
          image_url: formData.image_url
        })
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([{
          title: formData.title,
          category: formData.category,
          description: formData.description,
          details,
          image_url: formData.image_url
        }]);

      if (error) {
        console.error('Error saving project:', error);
      }
    }

    setFormData({ title: '', category: '', description: '', details: '', image_url: '' });
    fetchProjects();
  }

  async function handleDelete(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchProjects();
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      details: project.details.join('\n'),
      image_url: project.image_url || ''
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

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
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              Details (one per line)
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="inline-block mt-1 px-2 py-1 text-sm bg-primary-100 text-primary-800 rounded">
                    {project.category}
                  </span>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                  <ul className="mt-2 list-disc list-inside">
                    {project.details.map((detail, index) => (
                      <li key={index} className="text-gray-600">{detail}</li>
                    ))}
                  </ul>
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="mt-4 w-48 h-32 object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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