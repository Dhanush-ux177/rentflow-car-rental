import React from 'react';
import './Privacy.css';

function Privacy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <div className="legal-content">
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect personal information such as your name, email, phone number, driver's license details, and payment information when you register and make bookings.</p>
        </section>
        <section>
          <h2>2. How We Use Your Information</h2>
          <p>Your data is used to process bookings, communicate with you, improve our services, and for legal compliance. We do not sell your data to third parties.</p>
        </section>
        <section>
          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption and secure servers. However, no method of transmission over the internet is 100% secure.</p>
        </section>
        <section>
          <h2>4. Cookies</h2>
          <p>We use cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2>5. Third-Party Services</h2>
          <p>We may share data with trusted partners for payment processing and analytics. These partners are contractually obligated to protect your data.</p>
        </section>
        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at info@rentflow.com for such requests.</p>
        </section>
        <section>
          <h2>7. Changes to Privacy Policy</h2>
          <p>We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>
        <p className="last-updated">Last Updated: August 2024</p>
      </div>
    </div>
  );
}

export default Privacy;