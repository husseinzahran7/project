-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Only admins can manage user roles" ON user_roles;

-- Create new policies for user_roles
CREATE POLICY "Admins can manage user roles"
  ON user_roles
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Users can read user roles"
  ON user_roles FOR SELECT
  USING (true);

-- Update service policies
DROP POLICY IF EXISTS "Allow authenticated users to manage services" ON services;
CREATE POLICY "Allow admins to manage services"
  ON services
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Update project policies
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
CREATE POLICY "Allow admins to manage projects"
  ON projects
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Update testimonial policies
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON testimonials;
CREATE POLICY "Allow admins to manage testimonials"
  ON testimonials
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );