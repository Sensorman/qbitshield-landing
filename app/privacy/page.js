<!-- /app/privacy/page.js -->
export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At QbitShield, your privacy is a priority. We only collect minimal personal
        information such as your email address, name, and company — solely for the
        purpose of authentication and usage tracking.
      </p>
      <p className="mb-4">
        We do not sell or share your information with third parties. All access tokens
        and API usage are encrypted and stored securely using Supabase.
      </p>
      <p className="mb-4">
        For questions or data inquiries, email us at <a href="mailto:will@qbitshield.com" className="text-blue-400 underline">legal@qbitshield.com>privacy@qbitshield.com</a>.
      </p>
    </div>
  );
}

