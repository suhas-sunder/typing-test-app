import { useState } from "react";
import styles from "./styles/LoginFormInputs.module.css";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string; //Allows for custom HTML attribute type called focused
    // asterisk?: boolean;
  }
}

interface PropTypes {
  inputData: { [key: string]: string | boolean | null };
  inputValues: { [key: string]: string };
  setInputValues: (value: { [key: string]: string }) => void;
}

// Used by LoginForm.tsx component
function LoginFormInputs({
  inputData,
  inputValues,
  setInputValues,
}: PropTypes) {
  const [focused, setFocused] = useState<boolean>(false);
  const { pattern, asterisk: dispAsterisk, ...inputs } = inputData;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <label
        htmlFor={inputData.id?.toString()}
        className="relative mr-auto cursor-pointer pl-1 hover:border-0"
      >
        {dispAsterisk ? `${inputData.label} *` : inputData.label}
      </label>
      <input
        {...inputs}
        pattern={
          inputData.name?.toString().startsWith("confirm")
            ? inputValues.password
            : inputData.name?.toString().startsWith("email")
              ? undefined
              : pattern?.toString()
        }
        className="relative rounded-md border-2 border-solid p-2 pl-4"
        onChange={handleChange}
        onBlur={() => setFocused(true)}
        onFocus={() => setFocused(false)}
        focused={focused.toString()}
      />
      <span className={`${styles.error} relative hidden text-sm`}>
        {inputData.err}
      </span>
    </>
  );
}

export default LoginFormInputs;
