import { Link } from "react-router-dom";
import FormInputs from "./FormInputs";

interface PropTypes {
  formData: { [key: string]: string | boolean }[];
  inputValues: { [key: string]: string };
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValues: (value: { [key: string]: string }) => void;
}

// Component can be re-used for any form with input fields.
function SubmissionForm({
  formData,
  inputValues,
  submitForm,
  setInputValues,
}: PropTypes) {
  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col gap-4 text-xl max-w-md w-full ml-10 mr-10"
    >
      {formData.map((input) => (
        <FormInputs
          key={input.id.toString()}
          input={input}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      ))}
      {Object.prototype.hasOwnProperty.call(inputValues, "emailOrUsername") && (
        <div className="flex justify-between pl-6 pr-6">
          {/* Add a remember-me option here */}
          <Link to="/register">register</Link>
          <Link to="/register">forgot password</Link>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmissionForm;
