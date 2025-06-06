// Extract text from HTML
export function extractTextFromHtml(html: string): string {
  // Simple HTML tag removal - for production, consider using a proper HTML parser
  return html.replace(/<[^>]*>/g, "").trim();
}
