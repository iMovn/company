// lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),

  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .max(100, "Email không được quá 100 ký tự"),

  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(
      /^((\+84|84|0)[3|5|7|8|9])+([0-9]{8})$/,
      "Số điện thoại không hợp lệ (VD: 0912345678)"
    ),

  message: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(500, "Nội dung không được quá 500 ký tự"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Validation messages in Vietnamese
export const validationMessages = {
  name: {
    required: "Họ tên là bắt buộc",
    minLength: "Họ tên phải có ít nhất 2 ký tự",
    maxLength: "Họ tên không được quá 50 ký tự",
    invalid: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
  },
  email: {
    required: "Email là bắt buộc",
    invalid: "Email không hợp lệ",
    maxLength: "Email không được quá 100 ký tự",
  },
  phone: {
    required: "Số điện thoại là bắt buộc",
    invalid: "Số điện thoại không hợp lệ (VD: 0912345678)",
  },
  message: {
    required: "Nội dung là bắt buộc",
    minLength: "Nội dung phải có ít nhất 10 ký tự",
    maxLength: "Nội dung không được quá 500 ký tự",
  },
} as const;
