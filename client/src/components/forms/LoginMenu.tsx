import { useRef } from "react";

function LoginMenu() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(data.entries());
    console.log(formObject);

    try {
      const response = await fetch("http://localhost:3500/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formObject.username,
          email: formObject.email,
          password: formObject.password,
        }),
      });
    } catch (err) {
      let message;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xl">
      <label htmlFor="username" className="pl-1 hover:border-0">
        User Name
      </label>
      <input
        ref={usernameRef}
        id="username"
        type="input"
        name="username"
        placeholder="User Name"
        className="border-2 border-solid rounded-md p-2 pl-4"
      />
      <label htmlFor="email" className="mt-2 pl-1 hover:border-0">
        Email
      </label>
      <input
        ref={emailRef}
        id="email"
        type="input"
        name="email"
        placeholder="Email Address"
        className="border-2 border-solid rounded-md p-2 pl-4"
      />
      <label htmlFor="password" className="mt-2 pl-1 hover:border-0">
        Password
      </label>
      <input
        ref={passwordRef}
        id="password"
        type="input"
        name="password"
        placeholder="Password"
        className="border-2 border-solid rounded-md p-2 pl-4"
      />
      <button
        type="submit"
        className="bg-green-600 text-white mt-5 p-3 rounded-xl hover:bg-green-400"
      >
        Submit
      </button>
    </form>
  );
}

export default LoginMenu;
