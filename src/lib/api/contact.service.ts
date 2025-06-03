// lib/api/contact.service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const postContact = async (data: ContactFormData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/site/contact?domain_id=${DOMAIN_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi gửi liên hệ:", error);
    throw error;
  }
};
