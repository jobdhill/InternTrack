import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { supabase } from "../../lib/supabase";
import { useDocumentMeta } from "../../lib/useDocumentMeta";

export default function ResetPassword() {
  useDocumentMeta({
    title: "Choose a new password — InternNEXT",
    description: "Set a new password for your InternNEXT account.",
    path: "/reset-password",
    index: false,
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setHasSession(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setHasSession(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => navigate("/app"), 1500);
  }

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">
        Set a new password
      </h1>
      <p className="mt-1.5 text-sm text-[#64748B] leading-relaxed">
        Choose something you'll remember. We'll log you in right after.
      </p>

      {hasSession === false && (
        <div className="mt-5 px-4 py-3 rounded-md bg-[#FEF8E7] border border-[#F8E1A5] text-[12.5px] text-[#7C5400] leading-relaxed">
          This reset link is invalid or expired. Request a new one from{" "}
          <Link
            to="/forgot-password"
            className="font-semibold underline hover:text-[#5A3F00]"
          >
            forgot password
          </Link>
          .
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            minLength={8}
            required
            placeholder="At least 8 characters"
            autoComplete="new-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={hasSession === false || done}
          />
        </div>

        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            minLength={8}
            required
            placeholder="Type it again"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={hasSession === false || done}
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2.5">
            {error}
          </p>
        )}

        {done && (
          <p className="text-xs text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] rounded-md px-3 py-2.5">
            Password updated. Taking you to your dashboard…
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          loading={loading}
          disabled={hasSession === false || done}
        >
          {done ? "Done" : "Update password"}
        </Button>
      </form>

      <p className="mt-5 text-sm text-center text-[#64748B]">
        Changed your mind?{" "}
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
