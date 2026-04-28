import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // Brak konfiguracji nie blokuje aplikacji w developmencie - rzucimy bledem
  // dopiero przy probie zapisu, zeby UI dalej dzialal lokalnie bez .env.
  console.warn(
    "[supabase] Brak VITE_SUPABASE_URL lub VITE_SUPABASE_PUBLISHABLE_KEY w .env — zapis wynikow zostanie wylaczony.",
  );
}

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export const isSupabaseConfigured = () => Boolean(supabase);
