import { Link } from "react-router-dom";
import BrandMark from "../components/auth/BrandMark";

export default function Terms() {
  return (
    <div className="min-h-screen font-manrope bg-[#F8F8FA]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-[#0F172A]"
          >
            <BrandMark/>
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 text-[#374151]">
        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
          Privacy Policy and Terms of Service
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Last updated: May 24, 2026
        </p>

        <p className="mt-6 text-sm leading-relaxed">
          InternNext is a free application that allows users to track their
          internship and job applications. By creating an account or using
          the Service, you agree to the terms outlined below. You must be
          at least 13 years old to use the Service.
        </p>

        <Section title="Information We Collect">
          <p>
            We collect the information necessary to provide the Service:
            your email address and password (managed by our authentication
            provider, Supabase), or your Google account profile information
            if you choose to sign in with Google. Google account information is only used for authentication.
            We also store the application data you enter, including company names, roles,
            application dates, status, location, and notes.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>
            Your information is used solely to operate the Service and
            display your data back to you. We do not sell, rent, or share
            your personal information with third parties, and we do not use
            it for advertising. The only external services involved in
            operating InternNext are{" "}
            <a
              href="https://supabase.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-[#6366F1] hover:text-[#4F46E5] underline"
            >
              Supabase
            </a>{" "}
            (database and authentication) and Google (only when used for
            sign-in).
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You retain full ownership of the data you enter. You may update
            your application records at any time from your dashboard. To
            request deletion of specific records or your entire account
            along with all associated data, please contact us using the
            email address provided below, and we will process your request
            within a reasonable timeframe.
          </p>
        </Section>

        <Section title="Service Availability">
          <p>
            The Service is provided on an "as-is" and "as-available" basis,
            without warranties of any kind. We do not guarantee uninterrupted
            access or that the Service will be free from errors or data
            loss. You are encouraged to maintain your own records of
            important information. To the fullest extent permitted by law,
            InternNext and its operators shall not be liable for any damages
            arising from your use of the Service. We take reasonable measures to 
            protect your information, 
            but no method of electronic storage is completely secure.
          </p>
        </Section>

        <Section title="Acceptable Use">
          <p>
            You agree not to misuse the Service, including attempting to
            access accounts or data that do not belong to you, disrupting
            the Service, or using it for any unlawful purpose. We reserve
            the right to suspend or terminate accounts that violate these
            terms.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We may update these terms periodically. Any material changes
            will be reflected by updating the date above and, where
            appropriate, by notifying users through the Service.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For questions regarding these terms or to request account
            deletion, please contact us at{" "}
            <a
              href="mailto:contact@yourdomain.com"
              className="text-[#6366F1] hover:text-[#4F46E5] underline"
            >
              support@internnext.com
            </a>
            .
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
