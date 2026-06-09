import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import GoogleButton from "../../components/auth/GoogleButton";
import OrDivider from "../../components/auth/OrDivider";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { supabase } from "../../lib/supabase";
import { useDocumentMeta } from "../../lib/useDocumentMeta";

export default function Login() {
  useDocumentMeta({
    title: "Log in — InternNEXT",
    description:
      "Log in to InternNEXT to keep tracking your internship applications and response rates.",
    path: "/login",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/app");
  }

  async function handleGoogle() {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (error) setError(error.message);
  }

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">
        Welcome back
      </h1>
      <p className="mt-1.5 text-sm text-[#64748B]">
        Log in to keep tracking your applications.
      </p>

      <div className="mt-7">
        <GoogleButton label="Log in with Google" onClick={handleGoogle} />
      </div>

      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@gmail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2.5">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          loading={loading}
        >
          Log in
        </Button>
      </form>

      <p className="mt-6 text-sm text-center text-[#64748B]">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#6366F1] hover:text-[#4F46E5]"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
