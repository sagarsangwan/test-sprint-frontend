/**
 * Parses a JavaScript-style timestamp string and returns the date
 * in the format "Day Mon, YYYY" (e.g., "31 Oct, 2025").
 * @param {string} jsTimestamp The date string
 * @returns {string} The formatted date string.
 */
export function getFormattedDate(timestamp) {
  const dtObject = new Date(timestamp);

  // Define the formatting options
  const options = {
    year: "numeric", // 2025
    month: "short", // Oct
    day: "2-digit", // 31
    timeZone: "UTC", // Use UTC to prevent local time zone shifts
    // from potentially changing the date
  };

  // Use toLocaleDateString with a specific locale (en-US)
  // to ensure consistent output format
  const formattedDate = dtObject.toLocaleDateString("en-US", options);

  // Reorder the parts from default "10/31/2025" or "Oct 31, 2025"
  // to "31 Oct, 2025"
  const parts = formattedDate.split(/[ ,/]+/); // Splits by space, comma, or slash

  // Example: If parts = ["10", "31", "2025"] or ["Oct", "31", "2025"]
  // We want Day, Month, Year

  // Simple reorder logic (Month is parts[0], Day is parts[1], Year is parts[2])
  return `${parts[1]} ${parts[0]}, ${parts[2]}`;
}
