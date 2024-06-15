import ServerAPI from "../../api/userAPI";

//Verifies user email for signup
export default async function PostVerifyEmail({
  emailToken,
  setDisplayError,
  setIsVerified,
  setAccountDetails,
}) {
  try {
    const data = {
      emailToken,
    };

    const response = await ServerAPI.post("/verify-email", {
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
        setDisplayError(message);
      });

    const parseRes = await response;

    if (parseRes) {
      setIsVerified(true);
      setAccountDetails({
        username: parseRes.user_name,
        email: parseRes.user_email,
      });
      console.log(parseRes);
    } else {
      setDisplayError("Uh oh! Email verification failed!");
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
