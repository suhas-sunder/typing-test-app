import { AxiosError } from "axios";
import ServerAPI from "../../api/userAPI";

//Verifies user email for signup
export default async function PostVerifyForgotPwdToken({
  resetToken,
  setError,
  setResetPassword,
  setResetPasswordEmail,
}) {
  try {
    const data = {
      resetToken,
    };

    const response = await ServerAPI.post("/verify-pwd-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        let message;

        if (err instanceof AxiosError) {
          message = err.message;

          err?.response?.data && setError(err?.response?.data.error);
        } else {
          message = String(err);
        }

        console.log(message);
      });

    const parseRes = await response;

    if (parseRes) {
      if (parseRes.user_email) {
        setResetPasswordEmail(parseRes.user_email);
        setResetPassword(true);
      } else {
        setError("Password reset link is invalid");
      }
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
