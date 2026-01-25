// Database types for Supabase tables

export type UserRole = "client" | "trade";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TradeProfile {
  user_id: string;
  business_name: string;
  services: string[];
  service_radius_miles: number;
  zip_code: string;
  rating: number;
  total_jobs: number;
  phone?: string;
  profile_photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileInput {
  id: string; // UUID from auth.users
  email: string;
  role: UserRole;
}

export interface CreateTradeProfileInput {
  user_id: string;
  business_name: string;
  services: string[];
  service_radius_miles: number;
  zip_code: string;
  phone?: string;
}

// Available services for contractors
export const AVAILABLE_SERVICES = [
  "Roofing",
  "Solar",
  "Landscaping",
  "General Contracting",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Painting",
  "Deck Building",
  "Fencing",
  "Concrete",
  "Siding",
] as const;

export type ServiceType = (typeof AVAILABLE_SERVICES)[number];

// Job types
export type JobStatus = "open" | "in_progress" | "completed" | "cancelled";

export interface Job {
  id: string;
  client_id: string;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  service_type: string;
  status: JobStatus;
  budget_min?: number;
  budget_max?: number;
  created_at: string;
  updated_at: string;
}

export interface JobImage {
  id: string;
  job_id: string;
  image_url: string;
  is_aerial: boolean;
  created_at: string;
}

export interface CreateJobInput {
  client_id: string;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  service_type: string;
  budget_min?: number;
  budget_max?: number;
}
