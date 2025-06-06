/**
 * Format ngày theo chuẩn dd/mm/yyyy, đảm bảo consistent giữa server và client
 * @param dateString Chuỗi ngày từ API
 * @returns Chuỗi ngày dạng "dd/mm/yyyy"
 */

export function formatDateVi(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Ngày không hợp lệ";
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Relative time for recent posts
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? "Vừa xong" : `${diffInMinutes} phút trước`;
      }
      return diffInHours === 1 ? "1 giờ trước" : `${diffInHours} giờ trước`;
    }

    if (diffInDays === 1) {
      return "Hôm qua";
    }

    if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    }

    // Absolute date for older posts
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Ngày không hợp lệ";
  }
}

/**
 * Format ngày theo kiểu "10 Tháng 03, 2025"
 * @param dateString Chuỗi ngày từ API
 * @returns Chuỗi ngày đẹp để hiển thị
 */
export function formatDateLongVi(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}
