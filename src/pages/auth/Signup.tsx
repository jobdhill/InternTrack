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

export default function Signup() {
  useDocumentMeta({
    title: "Sign up free — InternNEXT",
    description:
      "Create a free InternNEXT account to track every internship application, measure your funnel, and find your bottleneck. No credit card needed.",
    path: "/signup",
  });

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    setLoading(false);

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already") || msg.includes("registered")) {
        setError("This email is already registered. Try logging in instead.");
      } else {
        setError(error.message);
      }
      return;
    }

    const identities = data.user?.identities;
    const isDuplicate =
      data.user !== null && Array.isArray(identities) && identities.length === 0;

    if (isDuplicate) {
      setError("This email is already registered. Try logging in instead.");
      return;
    }

    navigate(`/verify?email=${encodeURIComponent(email)}`);
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
        Create your account
      </h1>
      <p className="mt-1.5 text-sm text-[#64748B]">
        Free forever for students. No credit card needed.
      </p>

      <div className="mt-7">
        <GoogleButton label="Sign up with Google" onClick={handleGoogle} />
      </div>

      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            placeholder="John Smith"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@school.edu"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            minLength={8}
            required
            placeholder="At least 8 characters"
            autoComplete="new-password"
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
          Create account
        </Button>
      </form>

      <p className="mt-5 text-[11px] text-center text-[#9CA3AF] leading-relaxed">
        By signing up you agree to our{" "}
        <Link to="/terms" className="underline hover:text-[#374151]">
          Terms
        </Link>{" "}
        and{" "}
        <Link to="/terms" className="underline hover:text-[#374151]">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="mt-4 text-sm text-center text-[#64748B]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#6366F1] hover:text-[#4F46E5]"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
