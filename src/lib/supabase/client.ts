import { ENVIRONMENT } from "@/config/environment";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(ENVIRONMENT.supabaseUrl!, ENVIRONMENT.supabaseKey!);

// fungsi supabase client utk dipakai di browser(client)
