import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://awqidwtrpdlezgmgqpcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cWlkd3RycGRsZXpnbWdxcGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NDY3MzMsImV4cCI6MjA1NzAyMjczM30.8YCsC4SLJ-PwOUY9_6cLm0a7Qbst0JgqniCffi4Od4A';

export const supabase = createClient(supabaseUrl, supabaseKey);