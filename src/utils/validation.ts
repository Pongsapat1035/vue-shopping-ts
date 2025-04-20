import { z } from "zod";

export type ValidateResult = { isValid: boolean; message: string };

export const isEmail = (email: string): ValidateResult => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = z
    .string()
    .min(1, { message: "Email can't empty" })
    .regex(emailRegex, { message: "Email wrong format (example@com)" });

  const result = validEmail.safeParse(email);
  const validateStatus = result.success;

  return {
    isValid: validateStatus,
    message: validateStatus
      ? "Validation passed"
      : result.error.errors[0].message,
  };
};

export const isNumber = (num: number): ValidateResult => {
  const validateNumber = z.number().positive();

  const result = validateNumber.safeParse(num);
  const validateStatus = result.success;

  return {
    isValid: validateStatus,
    message: validateStatus
      ? "Validation passed"
      : result.error.errors[0].message,
  };
};

export const isPhoneNumber = (phoneNumber: string): ValidateResult => {
  const phoneRegex = /^\d{10}$/;
  const validateNumber = z
    .string()
    .min(10, "Phone number must 10 digits")
    .regex(phoneRegex, "Wrong phone number format");

  const result = validateNumber.safeParse(phoneNumber);
  const validateStatus = result.success;

  return {
    isValid: validateStatus,
    message: validateStatus
      ? "Validation passed"
      : result.error.errors[0].message,
  };
};

export const isNotEmpty = (text: string): ValidateResult => {
  const validateText = z.string().min(1, "Can't be empty");
  const result = validateText.safeParse(text);
  const validateStatus = result.success;

  return {
    isValid: validateStatus,
    message: validateStatus
      ? "Validation passed"
      : result.error.errors[0].message,
  };
};
