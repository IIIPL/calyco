// PrivacyPolicy.jsx — factual, clear, no placeholders
import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function PoliciesPrivacy() {
  return (
    <PolicyLayout title="Privacy Policy (DPDP)" lastUpdated="August 15, 2025">
      <h2>Scope</h2>
      <p>
        This Privacy Policy describes how CALYCO Paints Private Limited
        (“CALYCO”) collects, uses, stores, and protects personal data under
        India’s Digital Personal Data Protection Act, 2023 (DPDP Act). It applies
        to information collected through our websites, WhatsApp and chat
        channels, customer service, in-person sales, distributor interactions,
        and business meetings.
      </p>

      <h2>Personal Data We Collect</h2>
      <ul>
        <li><strong>Identity & Contact:</strong> name, phone, email, address, and company details.</li>
        <li><strong>Order Information:</strong> product purchases, delivery details, invoices, GST number if provided.</li>
        <li><strong>Device & Usage Data:</strong> IP address, browser type, device type, pages visited, time spent, and cookies.</li>
        <li><strong>Communications:</strong> messages or calls sent to our sales or support teams.</li>
        <li><strong>Business Data:</strong> supplier and distributor contact information shared during legitimate business dealings.</li>
      </ul>

      <h2>How We Collect Data</h2>
      <ul>
        <li>Directly from you when you order products, request quotations, or contact us.</li>
        <li>Automatically through website analytics and cookies.</li>
        <li>From service providers that assist with payments, deliveries, and technical operations.</li>
      </ul>

      <h2>How We Use Data</h2>
      <ul>
        <li>Process orders and arrange deliveries.</li>
        <li>Provide after-sales service and respond to inquiries.</li>
        <li>Operate, secure, and improve our website and operations.</li>
        <li>Send important updates related to orders or policy changes.</li>
        <li>Comply with tax and legal record-keeping requirements.</li>
      </ul>

      <h2>Legal Basis for Processing</h2>
      <ul>
        <li>Consent for marketing and optional cookies.</li>
        <li>Legitimate business operations such as order fulfilment and customer support.</li>
        <li>Legal obligations under applicable laws.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use essential cookies for site functionality and analytics cookies to
        understand usage trends. You can disable non-essential cookies in your
        browser settings.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We share personal data only with trusted service providers such as
        delivery companies, payment gateways, and IT service partners, strictly
        for the purposes described above. We do not sell personal data.
      </p>

      <h2>Data Security</h2>
      <p>
        We protect personal data through restricted access, encrypted
        communication channels, secure storage systems, and regular system
        updates.
      </p>

      <h2>Retention</h2>
      <p>
        Personal data is retained only as long as necessary for business,
        operational, or legal purposes, after which it is securely deleted.
      </p>

      <h2>Your Rights</h2>
      <ul>
        <li>Request access to the data we hold about you.</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>Withdraw consent for optional data processing.</li>
        <li>Raise concerns about misuse of personal data.</li>
      </ul>

      <h2>Children’s Data</h2>
      <p>
        CALYCO does not target or knowingly collect personal data from children
        without parental consent.
      </p>

      <h2>Policy Updates</h2>
      <p>
        We may update this policy to reflect changes in law or our operations.
        Updated policies will be posted on our website with a revised “Last
        updated” date.
      </p>

      <h2>Contact Us</h2>
      <p>
        For questions about this policy or to exercise your rights, use the
        contact form on our website or send a written request to our registered
        office in Gurugram, Haryana.
      </p>
    </PolicyLayout>
  );
}
