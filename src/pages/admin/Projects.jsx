import { useState, useEffect } from 'react';
import { projectsApi, storageApi } from '../../lib/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    details: '',
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const details = formData.details.split('\n').filter(d => d.trim());
      let imageUrl = null;

      if (formData.image) {
        imageUrl = await storageApi.uploadImage(formData.image, 'projects');
      }

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        details,
        ...(imageUrl && { image_url: imageUrl })
      };

      if (editingId) {
        await projectsApi.update(editingId, projectData);
      } else {
        await projectsApi.create(projectData);
      }

      setFormData({ title: '', category: '', description: '', details: '', image: null });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id, imageUrl) {
    try {
      if (imageUrl) {
        await storageApi.deleteImage(imageUrl, 'projects');
      }
      await projectsApi.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      details: project.details.join('\n'),
      image: null
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Manage Projects</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">
              Details (one per line)
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="mt-1 block w-full rounded-md bg-background border-primary-500/20 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-text-primary"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="mt-1 block w-full text-text-muted"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-card rounded-lg shadow-md">
        <ul className="divide-y divide-primary-500/20">
          {projects.map((project) => (
            <li key={project.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
                      <span className="text-sm text-primary-500 bg-primary-500/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-1 text-text-muted">{project.description}</p>
                    <ul className="mt-2 list-disc list-inside">
                      {project.details.map((detail, index) => (
                        <li key={index} className="text-text-muted">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-primary-500 hover:text-primary-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.image_url)}
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