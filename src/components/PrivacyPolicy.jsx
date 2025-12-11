import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Privacy Policy
                </h2>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 max-w-5xl mx-auto text-gray-700 leading-relaxed space-y-6">

                    <p>
                        At <strong>udyamregistrations.co.in</strong>, safeguarding the privacy of our users is one of our highest priorities. This Privacy Policy describes the types of information we collect from visitors, how that information is used, and the measures taken to protect it.
                    </p>

                    <p>
                        If you have any questions or need further clarification regarding this Privacy Policy, you may contact us at <a href="mailto:eudyogonline@gmail.com" className="text-blue-600 hover:underline">eudyogonline@gmail.com</a>.
                    </p>

                    <p className="text-sm italic">
                        Please note that this Privacy Policy applies only to information collected through our website and does not include data gathered offline or through unrelated platforms.
                    </p>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Consent</h3>
                        <p>
                            By continuing to use our website, you acknowledge and agree to the terms outlined in our Standard Operating Procedure (SOP) and accept the practices described in this Privacy Policy.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
                        <p className="mb-2">
                            When we request personal details, we will always clearly explain what information we require and why.
                        </p>
                        <p className="mb-2">
                            If you contact us directly, we may collect additional information such as your name, email address, phone number, message content, attachments, or any other details you choose to provide.
                        </p>
                        <p>
                            If you register for an account, we may request details such as your name, business name, address, email address, and phone number to complete the registration process.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
                        <p className="mb-2">We use the information we collect for various purposes, including:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Operating, managing, and maintaining our website</li>
                            <li>Enhancing and customizing your user experience</li>
                            <li>Understanding how visitors interact with our website</li>
                            <li>Developing and improving our services, features, and overall functionality</li>
                            <li>Communicating with you or our partners for support, updates, and promotional purposes</li>
                            <li>Sending important notifications and emails</li>
                            <li>Identifying and preventing fraudulent or unauthorized activities</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Log Files</h3>
                        <p className="mb-2">
                            Like many websites, udyamregistrations.co.in uses log files as part of its standard analytics and hosting operations. These files collect information such as IP addresses, browser types, ISP data, visit timestamps, referring pages, and click counts.
                        </p>
                        <p className="mb-2">This data is not linked to personally identifiable information and is used solely to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Analyze trends and visitor behavior</li>
                            <li>Administer and manage the website</li>
                            <li>Track navigation patterns</li>
                            <li>Gather demographic insights for analysis</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Advertising Partners’ Privacy Policies</h3>
                        <p className="mb-2">
                            You may review the respective Privacy Policies of our advertising partners to understand their data practices.
                        </p>
                        <p className="mb-2">
                            Third-party advertisers may use tools such as cookies, JavaScript, or web beacons to deliver and personalize ads displayed on our website. These tools automatically receive your IP address and help measure the effectiveness of their advertising campaigns.
                        </p>
                        <p>
                            Please note that we do not control or have access to the cookies or tracking technologies used by third-party advertisers.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Privacy Policies</h3>
                        <p className="mb-2">
                            Our Privacy Policy does not apply to external websites, advertisers, or service providers. We recommend reviewing their individual Privacy Policies for detailed information on their practices and opt-out procedures.
                        </p>
                        <p>
                            You can manage or disable cookies through your browser settings. Instructions for managing cookies may vary by browser.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
