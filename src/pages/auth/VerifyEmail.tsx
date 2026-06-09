import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { OTPInput, type SlotProps } from "input-otp";
import { Mail } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Label from "../../components/ui/Label";
import { cn } from "../../lib/cn";
import { supabase } from "../../lib/supabase";
import { useDocumentMeta } from "../../lib/useDocumentMeta";

const RESEND_SECONDS = 60;

export default function VerifyEmail() {
  useDocumentMeta({
    title: "Verify your email — InternNEXT",
    description: "Confirm your email address to finish setting up InternNEXT.",
    path: "/verify",
    index: false,
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email") || "your email";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (resendIn === 0) return;
    const t = window.setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  async function handleVerify() {
    if (code.length !== 6) return;
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      setCode("");
      return;
    }
    navigate("/app");
  }

  async function handleResend() {
    if (resendIn > 0) return;
    setResendIn(RESEND_SECONDS);
    setError("");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) setError(error.message);
  }

  return (
    <AuthLayout>
      <div className="h-12 w-12 rounded-xl bg-[#EEF2FF] grid place-items-center mb-5">
        <Mail className="h-6 w-6 text-[#6366F1]" strokeWidth={1.5} />
      </div>

      <h1 className="text-[28px] font-bold tracking-tight text-[#0F172A]">
        Check your email
      </h1>
      <p className="mt-1.5 text-sm text-[#64748B] leading-relaxed">
        We sent a 6-digit code to{" "}
        <span className="font-semibold text-[#0F172A]">{email}</span>. Enter it
        below to activate your account.
      </p>

      <div className="mt-7">
        <Label htmlFor="otp">Verification code</Label>
        <OTPInput
          id="otp"
          maxLength={6}
          value={code}
          onChange={setCode}
          onComplete={handleVerify}
          containerClassName="flex items-center"
          render={({ slots }: { slots: SlotProps[] }) => (
            <div className="flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          )}
        />
        {error && (
          <p className="mt-2 text-xs font-medium text-[#DC2626]">{error}</p>
        )}
      </div>

      <Button
        onClick={handleVerify}
        size="lg"
        className="w-full mt-6"
        loading={loading}
        disabled={code.length !== 6}
      >
        Verify and continue
      </Button>

      <div className="mt-5 px-4 py-3 rounded-md bg-[#FEF8E7] border border-[#F8E1A5] text-[12.5px] text-[#7C5400] leading-relaxed">
        <strong className="font-semibold">Didn't get it?</strong> Check your
        spam folder, or wait{" "}
        <span className="font-mono font-semibold">{resendIn}s</span> and resend.
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={resendIn > 0}
        className="mt-4 w-full text-sm font-medium text-[#0F172A] hover:text-[#6366F1] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
      >
        {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
      </button>

      <p className="mt-5 text-sm text-center text-[#64748B]">
        Wrong email?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#6366F1] hover:text-[#4F46E5]"
        >
          Use a different one
        </Link>
      </p>
    </AuthLayout>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-12 w-12 rounded-md border bg-white text-center grid place-items-center",
        "text-lg font-mono font-medium text-[#0F172A] transition-all",
        props.isActive
          ? "border-[#6366F1] ring-2 ring-[#6366F1]/20 z-10"
          : "border-[#E5E7EB]",
      )}
    >
      {props.char ?? props.placeholderChar}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-pulse">
      <div className="w-px h-5 bg-[#0F172A]" />
    </div>
  );
}
