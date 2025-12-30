import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rbzwxlfdtrheykgnksfm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiend4bGZkdHJoZXlrZ25rc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzQ1OTgsImV4cCI6MjA3MjMxMDU5OH0.NbrYY9Ou_LFjduCeUcw0QJCz9Q481BkHCG6OekGjNHU";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
