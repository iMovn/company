export function insertTocToContent(content: string, toc: string): string {
  if (!content || !toc) return content || "";

  // Check if content has any heading tags (h1-h6)
  const hasHeadings =
    /<h[1-6](?![^>]*class="toc-heading")[^>]*>.*?<\/h[1-6]>/i.test(content);

  // If no headings found, return original content without TOC
  if (!hasHeadings) {
    return content;
  }

  // SVG Crown icon
  const crownIcon = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide text-primary">
      <path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>
    </svg>
  `;

  // Create TOC HTML structure
  const tocHtml = `
    <div class="toc-wrapper my-8 p-4 bg-neutral-50 dark:bg-neutral-300 rounded-lg shadow-md">
      <div class="toc-header flex items-center mb-1 gap-1">
        ${crownIcon}
        <h5 class="text-lg font-bold text-gray-800 !mb-0">Mục lục bài viết</h5>
      </div>
      <div class="toc-content">${toc}</div>
    </div>
  `;

  // Tìm vị trí chèn TOC (trước heading đầu tiên hoặc sau đoạn đầu tiên)
  const firstHeadingRegex = /<(h[1-6])(?![^>]*class="toc-heading")[^>]*>/i;
  const firstParagraphRegex = /<p[^>]*>.*?<\/p>/i;

  // Ưu tiên chèn sau đoạn đầu tiên nếu có
  const paragraphMatch = content.match(firstParagraphRegex);
  if (paragraphMatch) {
    const endIndex = paragraphMatch.index! + paragraphMatch[0].length;
    return `
      ${content.slice(0, endIndex)}
      ${tocHtml}
      ${content.slice(endIndex)}
    `;
  }

  // Fallback: chèn trước heading đầu tiên
  const headingMatch = content.match(firstHeadingRegex);
  if (headingMatch) {
    const index = headingMatch.index!;
    return `
      ${content.slice(0, index)}
      ${tocHtml}
      ${content.slice(index)}
    `;
  }
  // If no suitable position found, return original content
  return content;
}
