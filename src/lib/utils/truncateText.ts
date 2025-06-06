// Truncate text function
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + "...";
  }

  return truncated + "...";
}
