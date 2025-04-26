import * as validate from "./validate.method"
import type { ValidateResult } from "./validate.method";

export default function validateHandle  (type :string | undefined ,input: string | number):string  {
  let errorMsg = ""

  switch (type) {
    case "email":
      const emailValidate: ValidateResult = validate.isEmail(input.toString());
      errorMsg = !emailValidate.isValid ? emailValidate.message : "";
      break;
    case "number":
      const numberValidate: ValidateResult = validate.isNumber(Number(input));
      errorMsg = !numberValidate.isValid ? numberValidate.message : "";
      break;
    case "phoneNumber":
      const phoneNumberValidate: ValidateResult = validate.isPhoneNumber(
        input.toString()
      );
      errorMsg = !phoneNumberValidate.isValid
        ? phoneNumberValidate.message
        : "";
      break;
    case "postcode":
      const postcodeValidate: ValidateResult = validate.isPostCode(input.toString());
      errorMsg = !postcodeValidate.isValid
        ? postcodeValidate.message
        : "";
      break;
    case "isNotEmpty":
      const isEmptyValidate: ValidateResult = validate.isNotEmpty(input.toString());
      errorMsg = !isEmptyValidate.isValid ? isEmptyValidate.message : "";
      break;
    default:
      break;
  }
  
  return  errorMsg
};