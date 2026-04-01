// Utility functions for StuTool
// This file will hold shared helper functions as the project grows.

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Converts a string to Title Case.
 * Preserves acronyms/known tech terms and handles prepositions.
 * Does NOT format emails, URLs, or descriptions.
 */
const LOWERCASE_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at",
  "to", "by", "in", "of", "with", "from", "as", "is",
]);

const PRESERVE_CASE_WORDS = new Set([
  "HTML", "CSS", "HTML/CSS", "SQL", "MySQL", "NoSQL", "MongoDB", "AWS",
  "GCP", "API", "REST", "iOS", "UI", "UX", "AI", "ML", "NLP", "Git",
  "DevOps", "CI/CD", "PhD", "IIT", "NIT", "VTU", "CBSE", "ICSE",
  "ISC", "SSLC", "HSC", "PUC", "B.Tech", "M.Tech", "B.E.", "M.E.",
  "B.Sc", "M.Sc", "BCA", "MCA", "B.Com", "M.Com", "MBA",
  "JavaScript", "TypeScript", "Node.js", "Next.js", "React",
  "Python", "Kotlin", "Java",
]);

export function formatTitleCase(str: string): string {
  if (!str || !str.trim()) return str;

  return str
    .split(/\s+/)
    .map((word, index) => {
      // Check if the word (case-insensitive) matches a preserved term
      const preserved = Array.from(PRESERVE_CASE_WORDS).find(
        (pw) => pw.toLowerCase() === word.toLowerCase()
      );
      if (preserved) return preserved;

      // Don't capitalize prepositions unless they're the first word
      if (index > 0 && LOWERCASE_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }

      // Standard title case: capitalize first letter
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Country code list for phone number dropdown.
 * India first, then popular options.
 */
export const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+1", label: "US / Canada (+1)", flag: "🇺🇸" },
  { code: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { code: "+971", label: "UAE (+971)", flag: "🇦🇪" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { code: "+49", label: "Germany (+49)", flag: "🇩🇪" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
  { code: "+81", label: "Japan (+81)", flag: "🇯🇵" },
  { code: "+86", label: "China (+86)", flag: "🇨🇳" },
  { code: "+966", label: "Saudi Arabia (+966)", flag: "🇸🇦" },
];

/**
 * Parse a phone string into { countryCode, number }.
 * Handles existing stored values like "+91 9876543210".
 */
export function parsePhone(phone: string): { countryCode: string; number: string } {
  if (!phone) return { countryCode: "+91", number: "" };

  const trimmed = phone.trim();

  // Try to match a country code at the start
  for (const cc of COUNTRY_CODES) {
    if (trimmed.startsWith(cc.code)) {
      const rest = trimmed.slice(cc.code.length).trim();
      return { countryCode: cc.code, number: rest };
    }
  }

  // Generic +XX or +XXX pattern
  const match = trimmed.match(/^(\+\d{1,4})\s*(.*)$/);
  if (match) {
    return { countryCode: match[1], number: match[2] };
  }

  // No country code found
  return { countryCode: "+91", number: trimmed };
}

/**
 * Combine country code and number into a single phone string.
 * Avoids duplication.
 */
export function combinePhone(countryCode: string, number: string): string {
  const cleanNumber = number.trim().replace(/^\+\d{1,4}\s*/, "");
  if (!cleanNumber) return "";
  return `${countryCode} ${cleanNumber}`;
}

/**
 * Calculate a simple resume score (0-100).
 */
export function calculateResumeScore(data: {
  name: string;
  email: string;
  phone: string;
  objective: string;
  educationCount: number;
  skillsCount: number;
  projectsCount: number;
  experienceCount: number;
}): { score: number; label: string; color: string } {
  let score = 0;
  const maxScore = 100;

  // Name (10 pts)
  if (data.name.trim()) score += 10;
  // Email (10 pts)
  if (data.email.trim()) score += 10;
  // Phone (5 pts)
  if (data.phone.trim()) score += 5;
  // Objective (15 pts)
  if (data.objective.trim()) {
    score += data.objective.length >= 50 ? 15 : 8;
  }
  // Education (20 pts)
  score += Math.min(data.educationCount * 7, 20);
  // Skills (20 pts)
  score += Math.min(data.skillsCount * 4, 20);
  // Projects (15 pts)
  score += Math.min(data.projectsCount * 8, 15);
  // Experience (5 pts — optional for freshers)
  score += Math.min(data.experienceCount * 5, 5);

  score = Math.min(score, maxScore);

  let label: string;
  let color: string;
  if (score >= 80) {
    label = "Excellent";
    color = "#22c55e";
  } else if (score >= 60) {
    label = "Good";
    color = "#3b82f6";
  } else if (score >= 40) {
    label = "Getting There";
    color = "#f59e0b";
  } else {
    label = "Needs Work";
    color = "#ef4444";
  }

  return { score, label, color };
}
