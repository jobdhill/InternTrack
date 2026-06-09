import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { supabase } from "../../lib/supabase";
import { useDocumentMeta } from "../../lib/useDocumentMeta";

export default function ForgotPassword() {
  useDocumentMeta({
    title: "Reset your password — InternNEXT",
    description: "Reset your InternNEXT account password.",
    path: "/forgot-password",
    index: false,
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">
        Reset your password
      </h1>
      <p className="mt-1.5 text-sm text-[#64748B] leading-relaxed">
        Enter the email tied to your account and we'll send you a link to set a
        new password.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@school.edu"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          loading={loading}
          disabled={sent}
        >
          {sent ? "Reset link sent" : "Send reset link"}
        </Button>

        {sent && (
          <p className="text-xs text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-md px-3 py-2.5">
            Check your inbox at{" "}
            <span className="font-medium">{email}</span> for a reset link.
          </p>
        )}

        {error && (
          <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2.5">
            {error}
          </p>
        )}
      </form>

      <p className="mt-5 text-sm text-center text-[#64748B]">
        Remembered it?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#6366F1] hover:text-[#4F46E5]"
        >
          Back to log in
        </Link>
      </p>
    </AuthLayout>
  );
}
