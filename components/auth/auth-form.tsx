"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { apiRequest } from "@/lib/api/client";

type LoginResponse = {
  jwt_token?: string;
  user_name?: string;
};

export function LoginForm() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await apiRequest<LoginResponse>("/v1/api/user/login", {
        method: "POST",
        body: JSON.stringify({ data: { email, password } }),
      });

      if (!response.jwt_token) {
        setError(response.user_name ? "Please verify your email before signing in." : "Unable to sign in.");
        return;
      }

      await auth.loginWithToken(response.jwt_token);
      router.push("/dashboard");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to save results and see your progress.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-black text-camp-ink">
          Email
          <input className="input-field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="grid gap-2 text-sm font-black text-camp-ink">
          Password
          <input className="input-field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="rounded-2xl bg-camp-peach px-4 py-3 text-sm font-bold text-camp-coral">{error}</p> : null}
        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-camp-muted">
        No account?{" "}
        <Link href="/register" className="font-black text-camp-coral hover:underline">
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const redirectTimeoutRef = useRef<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await apiRequest<{ message?: string }>("/v1/api/user/register", {
        method: "POST",
        body: JSON.stringify({ data: { username, email, password } }),
      });
      setMessage("Account created. You can sign in now.");
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
      redirectTimeoutRef.current = window.setTimeout(() => router.push("/login"), 1000);
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AuthCard title="Create your camp account" subtitle="Save test history once real progress data exists.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-black text-camp-ink">
          Name
          <input className="input-field" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label className="grid gap-2 text-sm font-black text-camp-ink">
          Email
          <input className="input-field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="grid gap-2 text-sm font-black text-camp-ink">
          Password
          <input className="input-field" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {message ? <p className="rounded-2xl bg-[rgba(132,162,146,0.16)] px-4 py-3 text-sm font-bold text-camp-sage">{message}</p> : null}
        {error ? <p className="rounded-2xl bg-camp-peach px-4 py-3 text-sm font-bold text-camp-coral">{error}</p> : null}
        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-camp-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-black text-camp-coral hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

function AuthCard({ children, subtitle, title }: { children: React.ReactNode; subtitle: string; title: string }) {
  return (
    <div className="card mx-auto max-w-md p-6 sm:p-8">
      <p className="eyebrow">Account</p>
      <h1 className="heading-md mt-2">{title}</h1>
      <p className="mb-6 mt-2 leading-7 text-camp-muted">{subtitle}</p>
      {children}
    </div>
  );
}
