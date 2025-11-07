import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">

  

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-30 pb-10">
           <div className="max-w-4xl mx-auto  py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>

        </div>
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-300 leading-relaxed">
              This Privacy Policy describes how we collect, use, and protect your personal information when you visit our website or engage with our consulting services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              We collect information that you provide directly to us, including your name, email address, phone number, company information, and any other details you choose to provide when requesting our consulting services. We also automatically collect certain information about your device and how you interact with our website.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the information we collect to provide and improve our consulting services, communicate with you about services and updates, respond to your inquiries, and comply with legal obligations. We never sell your personal information to third parties.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and secure server infrastructure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We may use third-party service providers to facilitate our services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

       
        </div>
      </main>


    
    </div>
  );
}