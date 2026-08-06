import React from 'react';
import './Terms.css';

function Terms() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <div className="legal-content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By using RentFlow, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2>2. User Accounts</h2>
          <p>You must create an account to book vehicles. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        </section>
        <section>
          <h2>3. Rental Agreement</h2>
          <p>All vehicle rentals are subject to a separate rental agreement provided at the time of booking. The renter must be at least 21 years old and possess a valid driver's license.</p>
        </section>
        <section>
          <h2>4. Payments and Fees</h2>
          <p>All payments are processed securely. Cancellation policies apply as per the booking terms. Late returns may incur additional charges.</p>
        </section>
        <section>
          <h2>5. Prohibited Uses</h2>
          <p>You may not use the vehicles for illegal activities, racing, or towing. Any damage caused by misuse will be the renter's responsibility.</p>
        </section>
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>RentFlow is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Vehicles are provided "as is" with all faults.</p>
        </section>
        <section>
          <h2>7. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes will be resolved in courts of Mumbai.</p>
        </section>
        <section>
          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use constitutes acceptance of the new terms.</p>
        </section>
        <p className="last-updated">Last Updated: August 2024</p>
      </div>
    </div>
  );
}

export default Terms;