import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Connection test function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("_test").select("*").limit(1);

    if (error && error.code !== "PGRST116") {
      // PGRST116 means table doesn't exist, which is fine for testing connection
      console.error("Supabase connection error:", error);
      return false;
    }

    console.log("✓ Supabase connection successful");
    return true;
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
    return false;
  }
}
