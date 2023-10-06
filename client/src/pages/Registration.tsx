import LoginMenu from "../components/forms/SubmissionForm";
import formData from "../local-json/formInputs.json"; //Contains input & label defaults for form

function Registration() {
  return (
    <div className="flex justify-center my-20">
      <LoginMenu formData={formData.registration} />
    </div>
  );
}

export default Registration;
