import { supabase } from "./supabase";
import type { UserRole } from "@/types/database";

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function signUp({ email, password, role }: SignUpData) {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No user returned from signup");

    // 2. Create profile record
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      role,
    });

    if (profileError) throw profileError;

    return { user: authData.user, error: null };
  } catch (error) {
    console.error("Sign up error:", error);
    return { user: null, error: error as Error };
  }
}

export async function login({ email, password }: LoginData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { session: data.session, error: null };
  } catch (error) {
    console.error("Login error:", error);
    return { session: null, error: error as Error };
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
    return { error };
  }
  return { error: null };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
