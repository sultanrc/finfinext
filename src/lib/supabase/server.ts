import { ENVIRONMENT } from "@/config/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    ENVIRONMENT.supabaseUrl!,
    ENVIRONMENT.supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll(); //membaca session yg aktif skrg
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            ); //fungsi yg dipanggil ketika session perlu diperbaharui
          } catch {}
        },
      },
    },
  );
};

//  fungsi supabase client utk dipakai di server(server component, action, route handler,))

//sama seperti client.ts tapi ini dipakai di server

//ada konfigurasi cookies kalo misal nanti mau ada fitur login untuk di server component, action, route handler, dll
