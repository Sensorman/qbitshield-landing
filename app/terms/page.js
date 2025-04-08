<!-- /app/terms/page.js -->
export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        By using QbitShield, you agree to abide by our API usage guidelines and
        authentication policies. Users are expected to use the API responsibly for
        quantum key generation and related secure communication applications.
      </p>
      <p className="mb-4">
        We reserve the right to suspend accounts for misuse, excessive requests,
        or activities that compromise system integrity.
      </p>
      <p className="mb-4">
        Questions? Reach us at <a href="mailto:will@qbitshield.com" className="text-blue-400 underline">support@qbitshield.com</a>.
      </p>
    </div>
  );
}