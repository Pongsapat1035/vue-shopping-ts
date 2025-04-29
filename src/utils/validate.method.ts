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
  const validateNumber = z.number({ message: "Please enter number" }).positive();

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
  const phoneRegex = /^0\d{9}$/;
  const validateNumber = z
    .string()
    .min(1, "phone number can't be empty")
    .max(10, "Phone number must 10 digits")
    .regex(phoneRegex, "Wrong phone number format (ex. 0912345678)");

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

export const isPostCode = (postcode: string): ValidateResult => {
  const postcodeRex = /^\d{5}$/;
  const validateText = z
    .string()
    .min(1, "Can't be empty")
    .max(5, "Can't more that 5 digit")
    .regex(postcodeRex, "Please check format again (ex.22110)");

  const result = validateText.safeParse(postcode);
  const validateStatus = result.success;
  return {
    isValid: validateStatus,
    message: validateStatus
      ? "Validation passed"
      : result.error.errors[0].message,
  };
};

export const allErrorEmpty = (obj: any) => {
  // if type !== object or value !== null
  if (typeof obj !== "object" || obj === null) {
    // return boolean check empty string
    return obj === "";
  }
  // if obj is object convert to array and then call this function again
  // array.every mean stop process if any array return false
  return Object.values(obj).every(allErrorEmpty);
};

export const allInputIsFilled = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj !== "";
  }
  return Object.values(obj).every(allInputIsFilled);
};
