/**
 * Utility functions for date formatting across Admin pages and API responses.
 */

/**
 * Converts any date string (YYYY-MM-DD or ISO string) to DD-MM-YYYY format.
 * Example: "2026-08-04" -> "04-08-2026"
 */
export function formatDateDDMMYYYY(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  
  const trimmed = dateStr.trim();

  // If already in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  // If in YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss format
  const dateOnly = trimmed.split("T")[0];
  const parts = dateOnly.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }

  // Fallback to JS Date object
  try {
    const d = new Date(trimmed);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (e) {
    return dateStr;
  }
}
