import { useState } from "react";
import styles from "./styles/FormInputs.module.css";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string; //Allows for custom HTML attribute type called focused
  }
}

interface PropTypes {
  input: { [key: string]: string | boolean | null };
  inputValues: { [key: string]: string };
  setInputValues: (value: { [key: string]: string }) => void;
}

function FormInputs({
  input,
  inputValues,
  setInputValues,
}: PropTypes) {
  const [focused, setFocused] = useState<boolean>(false);
  const { id, label, error, dispAsterisk } = input;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(inputValues);
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <>
      <label htmlFor={id?.toString()} className="pl-1 hover:border-0">
        {dispAsterisk ? `${label} *` : label}
      </label>
      <input
        {...input}
        className="border-2 border-solid rounded-md p-2 pl-4"
        onChange={handleChange}
        onBlur={handleFocus}
        onFocus={() => input.name === "confirmPassword" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className={styles.error}>{error}</span>
    </>
  );
}

export default FormInputs;
