import { useState } from "react";
import styles from "./styles/FormInputs.module.css";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string; //Allows for custom HTML attribute type called focused
    // asterisk?: boolean;
  }
}

interface PropTypes {
  input: { [key: string]: string | boolean | null };
  inputValues: { [key: string]: string };
  setInputValues: (value: { [key: string]: string }) => void;
}

function FormInputs({ input, inputValues, setInputValues }: PropTypes) {
  const [focused, setFocused] = useState<boolean>(false);
  const { pattern, asterisk: dispAsterisk, ...inputs } = input;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    console.log(inputValues);
  };

  return (
    <>
      <label htmlFor={input.id?.toString()} className="pl-1 hover:border-0">
        {dispAsterisk ? `${input.label} *` : input.label}
      </label>
      <input
        {...inputs}
        pattern={
          input.name?.toString().startsWith("confirm")
            ? inputValues.password
            : input.name?.toString().startsWith("email")
            ? undefined
            : pattern?.toString()
        }
        className="border-2 border-solid rounded-md p-2 pl-4"
        onChange={handleChange}
        onBlur={() => setFocused(true)}
        onFocus={() => setFocused(false)}
        focused={focused.toString()}
      />
      <span className={styles.error}>{input.err}</span>
    </>
  );
}

export default FormInputs;
