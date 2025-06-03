// components/common/form/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/Button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ContactFormData, contactSchema } from "lib/validations/contact";
import { postContact } from "lib/api/contact.service";
import { Input } from "@components/ui/Input";
import { Textarea } from "@components/ui/Textarea";

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ContactForm({
  className,
  onSuccess,
  onError,
}: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus("idle");
      await postContact(data);

      setSubmitStatus("success");
      setSubmitMessage(
        "Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm nhất."
      );
      reset();

      // Call success callback if provided
      onSuccess?.();

      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch {
      const errorMessage = "Gửi thông tin thất bại. Vui lòng thử lại sau.";
      setSubmitStatus("error");
      setSubmitMessage(errorMessage);

      // Call error callback if provided
      onError?.(errorMessage);

      // Auto hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  const getFieldError = (fieldName: keyof ContactFormData) => {
    return errors[fieldName]?.message;
  };

  const isFieldInvalid = (fieldName: keyof ContactFormData) => {
    return !!errors[fieldName] && !!dirtyFields[fieldName];
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className || ""}`}>
      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-primary-800 leading-relaxed">
              {submitMessage}
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800 leading-relaxed">
              {submitMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 gap-4 space-y-2">
          {/* Name Field */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-base font-semibold">
              Tên của bạn
            </label>
            <Input
              {...register("name")}
              placeholder="Nhập tên của bạn *"
              className={`transition-colors ${
                isFieldInvalid("name")
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {getFieldError("name") && (
              <p className="text-xs dark:text-red-400 text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {getFieldError("name")}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-base font-semibold">
              Địa chỉ Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Nhập địa chỉ email *"
              className={`transition-colors ${
                isFieldInvalid("email")
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
            {getFieldError("email") && (
              <p className="text-xs dark:text-red-400 text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {getFieldError("email")}
              </p>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <label htmlFor="phone" className="text-base font-semibold">
            Số điện thoại
          </label>
          <Input
            {...register("phone")}
            type="tel"
            placeholder="Số điện thoại * (VD: 0912345678)"
            className={`transition-colors ${
              isFieldInvalid("phone")
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          {getFieldError("phone") && (
            <p className="text-xs dark:text-red-400 text-red-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("phone")}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-1">
          <label htmlFor="phone" className="text-base font-semibold">
            Nội dung tin
          </label>
          <Textarea
            {...register("message")}
            placeholder="Hãy cho chúng tôi biết về dự án của bạn"
            rows={4}
            className={`transition-colors ${
              isFieldInvalid("message")
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          {getFieldError("message") && (
            <p className="text-xs dark:text-red-400 text-red-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {getFieldError("message")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="py-5 mt-4 text-base text-neutral-50 font-semibold rounded-2xl cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Đang gửi...
            </div>
          ) : (
            "Gửi nội dung tin"
          )}
        </Button>

        {/* Form Info */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            Các trường có dấu <span className="text-red-500">*</span> là bắt
            buộc
          </p>
          <p className="text-xs text-gray-400">
            Bằng cách gửi form này, bạn đồng ý để chúng tôi liên hệ tư vấn.
          </p>
        </div>
      </form>
    </div>
  );
}
