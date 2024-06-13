// Sanitize and validate inputs
function validation() {
  //validation
  const sanitize = (input: any): any => {
    if (typeof input === "string") {
      return input.replace(/[<>]/g, ""); // Basic sanitization removing angle brackets
    }
    return input;
  };

  const validateString = (value: any, name: string): void => {
    if (!value || typeof value !== "string") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateNumber = (value: any, name: string): void => {
    if (value === null || value === undefined || typeof value !== "number") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateDate = (value: any, name: string): Date => {
    const date = new Date(value);
    if (!date.getTime() || isNaN(date.getTime())) {
      throw new Error(`${name} is invalid!`);
    }
    return date;
  };

  return { sanitize, validateString, validateNumber, validateDate };
}

export default validation;
