export const metadata = {
  title: 'Contact Us - Fun5Games',
  description:
    'Contact the Fun5Games editorial team at Mediafinity Adtech Pvt Ltd — report a broken link, request a game listing, or get in touch for business enquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="page-content">
      <div className="static-page">
        <h1>Contact Fun5Games</h1>
        <p>
          Fun5Games is operated by <strong>Mediafinity Adtech Pvt Ltd</strong>. We would love to
          hear from you. Whether you have editorial feedback, spotted an outdated listing, want to
          suggest a game we should add, or need to reach us for a business matter, use the channels
          below.
        </p>

        <h2>Email</h2>
        <p>
          For all queries — general enquiries, editorial feedback, business &amp; advertising,
          broken-link reports, and copyright / DMCA notices — please email us at:
        </p>
        <p>
          <strong>quizzy2026@gmail.com</strong>
        </p>
        <p>
          To help us respond faster, please include a clear subject line such as
          &ldquo;Editorial feedback&rdquo;, &ldquo;Broken link&rdquo;, &ldquo;Business enquiry&rdquo;,
          or &ldquo;DMCA take-down&rdquo;, and the specific URL of the page you are writing about.
        </p>

        <h2>Copyright &amp; DMCA</h2>
        <p>
          Fun5Games uses game icons, screenshots, and metadata sourced from the official Google Play
          Store and Apple App Store for identification and editorial purposes only. If you are a
          rights-holder and believe specific content on our site should be removed, please email
          {' '}<strong>quizzy2026@gmail.com</strong> with the subject line &ldquo;DMCA&rdquo; and
          include (1) the exact URL of the page, (2) the specific asset you are asking us to
          remove, (3) proof you represent the rights-holder, and (4) your contact details. We
          respond to valid take-down requests promptly.
        </p>

        <h2>Response Time</h2>
        <p>
          Fun5Games is run by a small editorial team. We aim to reply to every email within two
          business days, but during busy periods it may take up to five business days. Thank you for
          your patience.
        </p>

        <h2>Registered Office</h2>
        <p>
          <strong>Mediafinity Adtech Pvt Ltd</strong>
          <br />
          AIHP Signature Tower, 418 &amp; 419
          <br />
          Phase IV, Udyog Vihar
          <br />
          Gurugram, Haryana &mdash; 122015
          <br />
          India
        </p>
        <p>
          Please note that Fun5Games is an online-only publication. Our office does not handle
          walk-ins, visitors or packages; please use email for all correspondence.
        </p>
      </div>
    </main>
  );
}
