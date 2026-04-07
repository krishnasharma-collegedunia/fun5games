export const metadata = {
  title: 'Contact Us - GameVault',
  description: 'Get in touch with the GameVault team.',
};

export default function ContactPage() {
  return (
    <main className="page-content">
      <div className="static-page">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you. Whether you have questions, feedback, or business inquiries,
          feel free to reach out using the information below.
        </p>
        <h2>General Inquiries</h2>
        <p>
          Email: <strong>contact@gamevault.example.com</strong>
        </p>
        <h2>Business & Partnerships</h2>
        <p>
          For advertising opportunities, game listing requests, or partnership inquiries, please
          email: <strong>business@gamevault.example.com</strong>
        </p>
        <h2>Report an Issue</h2>
        <p>
          Found a broken link or incorrect game information? Let us know at: <strong>support@gamevault.example.com</strong>
        </p>
        <h2>Response Time</h2>
        <p>
          We aim to respond to all inquiries within 48 hours during business days. Thank you for your patience.
        </p>
      </div>
    </main>
  );
}
