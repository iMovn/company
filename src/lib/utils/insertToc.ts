export function insertTocToContent(content: string, toc: string): string {
  if (!content || !toc) return content || "";

  // Tìm vị trí chèn TOC (trước heading đầu tiên hoặc sau đoạn đầu tiên)
  const firstHeadingRegex = /<(h[1-6])(?![^>]*class="toc-heading")[^>]*>/i;
  const firstParagraphRegex = /<p[^>]*>.*?<\/p>/i;

  // Ưu tiên chèn sau đoạn đầu tiên nếu có
  const paragraphMatch = content.match(firstParagraphRegex);
  if (paragraphMatch) {
    const endIndex = paragraphMatch.index! + paragraphMatch[0].length;
    return `
      ${content.slice(0, endIndex)}
      <div class="toc-wrapper my-8 p-4 bg-neutral-50 dark:bg-neutral-300 rounded-lg shadow-md">
        <div class="toc-header flex items-center mb-1">
          <Crown className="w-4 h-4 mr-2 text-primary" />
          <h5 class="text-lg font-bold text-gray-800">Mục lục bài viết</h5>
        </div>
        <div class="toc-content">${toc}</div>
      </div>
      ${content.slice(endIndex)}
    `;
  }

  // Fallback: chèn trước heading đầu tiên
  const headingMatch = content.match(firstHeadingRegex);
  if (headingMatch) {
    const index = headingMatch.index!;
    return `
      ${content.slice(0, index)}
      <div class="toc-wrapper my-8 p-4 bg-neutral-50 dark:bg-neutral-300 rounded-lg shadow-md">
        <div class="toc-header flex items-center mb-1">
          <Crown className="w-4 h-4 mr-2 text-primary" />
          <h5 class="text-lg font-bold text-gray-800">Mục lục bài viết</h5>
        </div>
        <div class="toc-content">${toc}</div>
      </div>
      ${content.slice(index)}
    `;
  }

  return content;
}
