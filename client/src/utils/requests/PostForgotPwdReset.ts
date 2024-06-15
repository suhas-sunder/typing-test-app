import ServerAPI from "../../api/userAPI";

//Verifies user email for signup
export default async function PostForgotPwdReset({
  setIsReset,
  setError,
  email,
  password,
}) {
  try {
    const data = {
      email,
      password,
    };

    const response = await ServerAPI.post("/reset-pwd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        let message;

        if (err instanceof Error) {
          message = err.message;
        } else {
          message = String(err);
        }

        console.log(message);
        setError(message);
      });

    const parseRes = await response;

    if (parseRes) {
      setIsReset(true);
    } else {
      setError("Uh oh! Something went wrong. Unable to reset your password!");
      console.log("Error creating creating user account");
    }
  } catch (err) {
    let message;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }
}
