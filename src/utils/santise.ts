// sanitize.ts
export type SanitizeResult = {
  renderSafe: string;  // HTML-escaped, safe to inject into the DOM (innerHTML)
  plain: string;       // Best-effort plain text (no tags), good for storage/search
  flags: {
    lengthExceeded: boolean;
    containsUrl: boolean;
    excessiveUrls: boolean;
    repeatedChars: boolean;
    blacklistedWord: boolean;
    suspiciousJs: boolean;
    hadHtmlTags: boolean;
    hadZeroWidth: boolean;
    hadControlChars: boolean;
  };
};

type SanitizeOptions = {
  maxLength?: number;           // hard cap (default 5_000)
  maxUrlsBeforeExcessive?: number; // default 3
  blacklist?: string[];         // case-insensitive phrases (simple)
};

const DEFAULT_BLACKLIST = [
  "free money",
  "viagra",
  "crypto giveaway",
  "work from home",
  "click here",
  "earn $$$",
  "loan approval",
  "100% free",
  "visit this link",
  "adult only",
];

export function sanitizeUserInput(
  input: string,
  opts: SanitizeOptions = {}
): SanitizeResult {
  const {
    maxLength = 5_000,
    maxUrlsBeforeExcessive = 3,
    blacklist = DEFAULT_BLACKLIST,
  } = opts;

  // Normalize Unicode (helps collapse visually-similar forms)
  let s = input.normalize("NFC");

  // Strip zero-width & bidi controls (often used to obfuscate)
  const ZERO_WIDTH_RE = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;
  const hadZeroWidth = ZERO_WIDTH_RE.test(s);
  s = s.replace(ZERO_WIDTH_RE, "");

  // Remove most control chars (keep \n, \r, \t)
  const CONTROL_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
  const hadControlChars = CONTROL_RE.test(s);
  s = s.replace(CONTROL_RE, "");

  // Soft trim excessive whitespace
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();

  // Detect HTML/JS upfront
  const HTML_TAG_RE = /<[^>]+>/i;
  const hadHtmlTags = HTML_TAG_RE.test(s);
  const JSY_RE =
    /(javascript:|data:text\/html|on\w+\s*=|<\s*script|\bdocument\.|\bwindow\.)/i;
  const suspiciousJs = JSY_RE.test(s);

  // Remove script/style/iframe blocks entirely (defense-in-depth)
  s = s
    .replace(/<\s*script\b[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*style\b[\s\S]*?<\s*\/\s*style\s*>/gi, "")
    .replace(/<\s*iframe\b[\s\S]*?<\s*\/\s*iframe\s*>/gi, "");

  // Strip remaining HTML tags (very conservative)
  const STRIP_TAGS_RE = /<\/?[^>\s]+(?:\s[^>]*?)?>/g;
  const plain = s.replace(STRIP_TAGS_RE, "");

  // Neutralize 'javascript:' and inline handlers that may survive obfuscation
  // (just in case remnants exist without angle brackets)
  const NEUTRALIZED = plain
    .replace(/javascript\s*:/gi, "javascript\u{200B}:") // break the protocol
    .replace(/\bon\w+\s*=\s*[^ \t\r\n]+/gi, "");        // strip inline handlers

  // Spam heuristics
  const URL_RE =
    /\b((https?:\/\/|ftp:\/\/|www\.)[^\s<>"')]+|[a-z0-9.-]+\.[a-z]{2,}\/[^\s<>"')]*)/gi;
  const urls = [...NEUTRALIZED.matchAll(URL_RE)].map((m) => m[0]);
  const containsUrl = urls.length > 0;
  const excessiveUrls = urls.length >= maxUrlsBeforeExcessive;

  const repeatedChars = /(.)\1{5,}/.test(NEUTRALIZED); // 6+ same chars in a row

  const lower = NEUTRALIZED.toLowerCase();
  const blacklistedWord = blacklist.some((phrase) =>
    lower.includes(phrase.toLowerCase())
  );

  // Enforce max length
  const lengthExceeded = NEUTRALIZED.length > maxLength;
  const truncated = lengthExceeded
    ? NEUTRALIZED.slice(0, maxLength)
    : NEUTRALIZED;

  // HTML-escape for safe rendering
  const renderSafe = escapeHtml(truncated);

  return {
    renderSafe,
    plain: truncated,
    flags: {
      lengthExceeded,
      containsUrl,
      excessiveUrls,
      repeatedChars,
      blacklistedWord,
      suspiciousJs,
      hadHtmlTags,
      hadZeroWidth,
      hadControlChars,
    },
  };
}

// Minimal, fast HTML escaper for safe rendering (innerHTML)
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
