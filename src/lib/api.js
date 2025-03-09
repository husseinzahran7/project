import { supabase } from './supabase';

// Admin initialization
export const adminApi = {
  async initializeAdmin(email, password) {
    try {
      // Create the admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;

      // Directly insert the admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: authData.user.id,
          role: 'admin'
        }]);

      if (roleError) {
        // If insertion fails, try updating instead
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: 'admin' })
          .eq('user_id', authData.user.id);

        if (updateError) throw updateError;
      }

      return { success: true, user: authData.user };
    } catch (error) {
      console.error('Error initializing admin:', error);
      throw error;
    }
  },

  async checkAdminStatus(userId) {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data?.role === 'admin';
  }
};

async function setUserAsAdmin(userId) {
  try {
    // First try to create a new user_role entry
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert([{
        user_id: userId,
        role: 'admin'
      }]);

    if (insertError) {
      // If entry exists, try updating it
      const { error: updateError } = await supabase
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', userId);

      if (updateError) throw updateError;
    }

    return true;
  } catch (error) {
    console.error('Error setting user as admin:', error);
    throw error;
  }
}

// Services API
export const servicesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(service) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Projects API
export const projectsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Testimonials API
export const testimonialsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(testimonial) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Storage API for handling file uploads
export const storageApi = {
  async uploadImage(file, bucket = 'projects') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteImage(path, bucket = 'projects') {
    const fileName = path.split('/').pop();
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    if (error) throw error;
    return true;
  }
};