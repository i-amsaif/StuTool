/**
 * Smart formatting engine for StuTool.
 * Designed to be reusable across the entire application.
 */

const LOWERCASE_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at",
  "to", "by", "in", "of", "with", "from", "as", "is",
]);

const isUrlOrEmail = (str: string): boolean => {
  if (str.includes("@") && str.includes(".")) return true;
  if (str.startsWith("http://") || str.startsWith("https://")) return true;
  if (/\.(com|org|net|io|in|co|edu|gov)(\/|$)/i.test(str)) return true;
  return false;
};

/**
 * Smart Title Case (Rule 1 & 2)
 * - Preserves words that already contain uppercase letters (e.g. GitHub, iPhone, 3D)
 * - Converts entirely lowercase words to Title Case
 * - Preserves numeric prefixes (e.g., 3d -> 3d, but 3D -> 3D)
 * - Handles hyphenated and apostrophe names (e.g. mohammed-salman -> Mohammed-Salman)
 * - Ignores URLs and Emails
 */
export function smartTitleCase(str: string): string {
  if (!str || !str.trim()) return str;

  return str
    .split(/(\s+)/)
    .map((token, index, arr) => {
      if (!token.trim()) return token; // preserve whitespace exactly
      if (isUrlOrEmail(token)) return token; // ignore URLs and emails
      if (/[A-Z]/.test(token)) return token; // Rule 1: preserve intentional capitalization

      // Rule 2: entirely lowercase
      // Check for prepositions (if not the first actual word)
      const isFirstWord = index === 0 || arr.slice(0, index).join("").trim().length === 0;

      if (!isFirstWord && LOWERCASE_WORDS.has(token.toLowerCase())) {
        return token.toLowerCase();
      }

      // Title case it, handling hyphens and apostrophes inside the token
      return token
        .split(/([-'])/)
        .map((part) => {
          if (part === "-" || part === "'") return part;
          if (part.length === 0) return part;
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join("");
    })
    .join("");
}

/**
 * Smart Sentence Case (Rule 3)
 * - Capitalizes the first letter of each sentence
 * - Preserves existing uppercase letters exactly as typed
 * - Preserves all whitespace, tabs, and line breaks
 * - Ignores URLs and Emails
 */
export function smartSentenceCase(str: string): string {
  if (!str || !str.trim()) return str;

  let capitalizeNext = true;

  return str
    .split(/(\s+)/)
    .map((token) => {
      if (!token.trim()) {
        // If it's whitespace containing a newline, it starts a new sentence.
        if (token.includes("\n")) {
          capitalizeNext = true;
        }
        return token;
      }

      if (isUrlOrEmail(token)) {
        // Don't format URL/email, but determine if it ends a sentence
        capitalizeNext = /[.!?]$/.test(token);
        return token;
      }

      let result = "";
      for (let i = 0; i < token.length; i++) {
        const char = token[i];
        if (capitalizeNext && /[a-zA-Z]/.test(char)) {
          result += char.toUpperCase();
          capitalizeNext = false;
        } else {
          result += char; // preserves existing casing, including intentional caps
        }

        if (/[.!?]/.test(char)) {
          capitalizeNext = true;
        }
      }
      return result;
    })
    .join("");
}
