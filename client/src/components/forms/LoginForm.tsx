import { Link } from "react-router-dom";
import FormInputs from "./LoginFormInputs";

interface PropTypes {
  formData: { [key: string]: string | boolean }[];
  inputValues: { [key: string]: string };
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValues: (value: { [key: string]: string }) => void;
}

// Component can be re-used for any form with input fields.
function LoginForm({
  formData,
  inputValues,
  submitForm,
  setInputValues,
}: PropTypes) {
  return (
    <form
      onSubmit={submitForm}
      className="flex relative flex-col gap-4 text-xl max-w-md w-full ml-10 mr-10"
    >
      {formData.map((data) => (
        <FormInputs
          key={data.id.toString()}
          inputData={data}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      ))}
      {Object.prototype.hasOwnProperty.call(inputValues, "emailOrUsername") && (
        <div className="flex relative justify-between pl-6 pr-6">
          {/* Add a remember-me and forgot password option here */}
          <Link to="/register">register</Link>
          <Link to="/register">forgot password</Link>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
