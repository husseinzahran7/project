-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('projects', 'projects', true),
  ('testimonials', 'testimonials', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for projects bucket
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'projects'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update project images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'projects'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'projects'
    AND auth.role() = 'authenticated'
  );

-- Set up storage policies for testimonials bucket
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonials');

CREATE POLICY "Authenticated users can upload testimonial images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'testimonials'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update testimonial images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'testimonials'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete testimonial images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'testimonials'
    AND auth.role() = 'authenticated'
  );