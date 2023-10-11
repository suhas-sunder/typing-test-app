import SubmissionForm from "../components/forms/SubmissionForm";
import formInputData from "../local-json/formInputData.json"; //Contains input & label defaults for form

function Register() {
  return (
    <div className="flex justify-center my-20">
      <SubmissionForm formData={formInputData.registration} />
    </div>
  );
}

export default Register;
