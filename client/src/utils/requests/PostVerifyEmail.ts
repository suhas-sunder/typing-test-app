import ServerAPI from "../../api/userAPI";
async function PostVerifyEmail({
  email,
  username,
  setDisplayError,
  setVerificationSent,
  setSentEmailCount,
}) {
  try {
    const data = {
      username,
      email,
    };

    const response = await ServerAPI.post("/send-verification", {
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
      setVerificationSent(
        `Verification email has just been sent! ${new Date().toLocaleString()}`,
      );
      setSentEmailCount((prevState) => prevState + 1);
    } else {
      setDisplayError(
        "Error! Failed to send verification email to user. Please try again later!",
      );
      setSentEmailCount((prevState) => prevState + 1);
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

export default PostVerifyEmail;
