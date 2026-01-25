import { z } from "zod";

// ============================================
// AUTHENTICATION SCHEMAS
// ============================================

// Strong password validation
export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

// User registration
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name contains invalid characters"),
  userType: z.enum(["homeowner", "contractor"], {
    errorMap: () => ({ message: "User type must be homeowner or contractor" }),
  }),
});

// User login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ============================================
// PROFILE SCHEMAS
// ============================================

// Contractor trade profile
export const tradeProfileSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must not exceed 100 characters"),
  trade: z.enum([
    "roofing",
    "plumbing",
    "electrical",
    "hvac",
    "landscaping",
    "painting",
    "flooring",
    "windows",
    "siding",
    "general_contractor",
  ]),
  serviceAreaRadius: z
    .number()
    .min(1, "Service area must be at least 1 mile")
    .max(100, "Service area cannot exceed 100 miles"),
  yearsExperience: z
    .number()
    .min(0, "Years of experience cannot be negative")
    .max(75, "Years of experience seems invalid")
    .optional(),
  licenseNumber: z
    .string()
    .max(50, "License number must not exceed 50 characters")
    .optional(),
  insuranceVerified: z.boolean().optional(),
  bio: z
    .string()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional(),
});

// Profile update
export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/)
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
  profileImageUrl: z.string().url("Invalid URL").optional(),
});

// ============================================
// JOB SCHEMAS
// ============================================

// Job creation
export const jobSchema = z
  .object({
    title: z
      .string()
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must not exceed 100 characters"),
    description: z
      .string()
      .min(50, "Description must be at least 50 characters")
      .max(2000, "Description must not exceed 2000 characters"),
    serviceType: z.enum([
      "roofing",
      "plumbing",
      "electrical",
      "hvac",
      "landscaping",
      "painting",
      "flooring",
      "windows",
      "siding",
      "general",
    ]),
    budgetMin: z
      .number()
      .min(100, "Minimum budget must be at least $100")
      .max(1000000, "Minimum budget cannot exceed $1,000,000"),
    budgetMax: z
      .number()
      .min(100, "Maximum budget must be at least $100")
      .max(1000000, "Maximum budget cannot exceed $1,000,000"),
    latitude: z
      .number()
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    longitude: z
      .number()
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
    address: z.string().max(500, "Address too long").optional(),
    urgency: z.enum(["low", "medium", "high", "emergency"]).optional(),
    preferredStartDate: z.string().datetime().optional(),
  })
  .refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["budgetMax"],
  });

// Job update
export const jobUpdateSchema = z.object({
  title: z.string().min(10).max(100).optional(),
  description: z.string().min(50).max(2000).optional(),
  budgetMin: z.number().min(100).max(1000000).optional(),
  budgetMax: z.number().min(100).max(1000000).optional(),
  status: z
    .enum(["open", "in_progress", "completed", "cancelled"])
    .optional(),
  urgency: z.enum(["low", "medium", "high", "emergency"]).optional(),
});

// ============================================
// BID SCHEMAS
// ============================================

// Bid submission
export const bidSchema = z.object({
  jobId: z.string().uuid("Invalid job ID"),
  amount: z
    .number()
    .min(50, "Bid amount must be at least $50")
    .max(1000000, "Bid amount cannot exceed $1,000,000"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  estimatedDays: z
    .number()
    .min(1, "Estimated days must be at least 1")
    .max(365, "Estimated days cannot exceed 365"),
  proposedStartDate: z.string().datetime().optional(),
  notes: z.string().max(500, "Notes must not exceed 500 characters").optional(),
});

// Bid update
export const bidUpdateSchema = z.object({
  amount: z.number().min(50).max(1000000).optional(),
  message: z.string().min(20).max(1000).optional(),
  estimatedDays: z.number().min(1).max(365).optional(),
  status: z.enum(["pending", "accepted", "rejected", "withdrawn"]).optional(),
});

// ============================================
// MESSAGE SCHEMAS
// ============================================

// Message creation
export const messageSchema = z.object({
  jobId: z.string().uuid("Invalid job ID"),
  recipientId: z.string().uuid("Invalid recipient ID"),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must not exceed 2000 characters"),
});

// ============================================
// REVIEW SCHEMAS
// ============================================

// Review creation
export const reviewSchema = z.object({
  jobId: z.string().uuid("Invalid job ID"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .int("Rating must be a whole number"),
  comment: z
    .string()
    .min(20, "Comment must be at least 20 characters")
    .max(1000, "Comment must not exceed 1000 characters"),
  wouldRecommend: z.boolean().optional(),
});

// ============================================
// SEARCH & FILTER SCHEMAS
// ============================================

// Job search/filter
export const jobSearchSchema = z.object({
  serviceType: z
    .enum([
      "roofing",
      "plumbing",
      "electrical",
      "hvac",
      "landscaping",
      "painting",
      "flooring",
      "windows",
      "siding",
      "general",
    ])
    .optional(),
  minBudget: z.number().min(0).max(1000000).optional(),
  maxBudget: z.number().min(0).max(1000000).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  radius: z.number().min(1).max(100).optional(),
  status: z.enum(["open", "in_progress", "completed", "cancelled"]).optional(),
  urgency: z.enum(["low", "medium", "high", "emergency"]).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validate data against a schema and return typed result
 */
export function validate<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map(
    (err) => `${err.path.join(".")}: ${err.message}`
  );

  return { success: false, errors };
}
