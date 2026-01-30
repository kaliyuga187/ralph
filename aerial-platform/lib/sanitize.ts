import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Server-side DOMPurify setup
const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

/**
 * Sanitize HTML content allowing only safe tags
 * Use this for rich text content that should preserve basic formatting
 */
export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
    FORCE_BODY: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  }) as string;
}

/**
 * Sanitize plain text by removing all HTML tags
 * Use this for user-generated content that should be displayed as plain text
 */
export function sanitizeText(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize URLs to prevent javascript: and data: URI attacks
 * Use this before displaying or redirecting to user-provided URLs
 */
export function sanitizeUrl(dirty: string): string | null {
  // Remove any whitespace
  const trimmed = dirty.trim();

  // Block dangerous protocols
  const dangerousProtocols = [
    "javascript:",
    "data:",
    "vbscript:",
    "file:",
    "about:",
  ];

  const lowerUrl = trimmed.toLowerCase();
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return null;
    }
  }

  // Ensure URL starts with http:// or https://
  if (!lowerUrl.startsWith("http://") && !lowerUrl.startsWith("https://")) {
    return null;
  }

  try {
    // Validate URL structure
    const url = new URL(trimmed);
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Sanitize filename to prevent path traversal attacks
 * Use this for user-uploaded files
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path separators
  let clean = filename.replace(/[/\\]/g, "");

  // Remove any non-alphanumeric characters except dots, hyphens, and underscores
  clean = clean.replace(/[^a-zA-Z0-9._-]/g, "_");

  // Ensure filename doesn't start with a dot (hidden file)
  if (clean.startsWith(".")) {
    clean = "file_" + clean;
  }

  // Limit length
  if (clean.length > 255) {
    const ext = clean.split(".").pop() || "";
    clean = clean.substring(0, 255 - ext.length - 1) + "." + ext;
  }

  return clean;
}

/**
 * Sanitize SQL search query to prevent SQL injection
 * Note: Always use parameterized queries, but this adds an extra layer
 */
export function sanitizeSearchQuery(query: string): string {
  // Remove special SQL characters
  let clean = query.replace(/[';\-]/g, "");

  // Limit length
  if (clean.length > 100) {
    clean = clean.substring(0, 100);
  }

  return clean.trim();
}

/**
 * Sanitize email address
 * Use this to validate and clean email inputs
 */
export function sanitizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return null;
  }

  // Additional validation
  if (trimmed.length > 254) {
    return null;
  }

  return trimmed;
}

/**
 * Sanitize phone number to digits only
 */
export function sanitizePhone(phone: string): string {
  // Keep only digits and plus sign
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Escape special characters for safe inclusion in JSON
 */
export function escapeJson(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

/**
 * Comprehensive input sanitizer for job descriptions
 * Combines text sanitization with length limits
 */
export function sanitizeJobDescription(description: string): string {
  let clean = sanitizeText(description);

  // Enforce length limits
  if (clean.length > 2000) {
    clean = clean.substring(0, 2000);
  }

  return clean.trim();
}

/**
 * Comprehensive input sanitizer for messages
 */
export function sanitizeMessage(message: string): string {
  let clean = sanitizeText(message);

  // Enforce length limits
  if (clean.length > 2000) {
    clean = clean.substring(0, 2000);
  }

  return clean.trim();
}

/**
 * Sanitize user profile data
 */
export function sanitizeProfileData(data: {
  fullName?: string;
  bio?: string;
  businessName?: string;
}): typeof data {
  return {
    fullName: data.fullName ? sanitizeText(data.fullName) : undefined,
    bio: data.bio ? sanitizeText(data.bio) : undefined,
    businessName: data.businessName
      ? sanitizeText(data.businessName)
      : undefined,
  };
}
