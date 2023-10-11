import SubmissionForm from "../components/forms/SubmissionForm";
import formInputData from "../local-json/formInputData.json"; //Contains input & label defaults for form

function Login({ setAuth }: (value: boolean) => void) {
  const handleAuth = () => {
    setAuth(true);
  };

  return (
    <div className="flex justify-center my-20">
      <SubmissionForm formData={formInputData.login} />
      <button onClick={handleAuth}>temp auth</button>
    </div>
  );
}

export default Login;
