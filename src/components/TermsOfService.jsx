import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Terms of Service
                </h2>

                {/* Refund Policy & TAT */}
                <div className="mb-8">
                    <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide rounded-t">
                        Refund Policy & Turn Around Time (TAT)
                    </div>
                    <div className="bg-white p-5 border border-blue-200 rounded-b text-gray-800 leading-relaxed">
                        <p className="mb-3">
                            To ensure the authenticity of the applicant, we send a <strong>ONE TIME PASSCODE (OTP)</strong> to the mobile number of the applicant whose Aadhaar is being used in the application. The OTP is delivered on the mobile number linked with Aadhaar used in the application. We will not be able to send Aadhaar OTP on any other number.
                        </p>
                        <p className="mb-3">
                            The OTP sent must be shared with us for validation. The certificate processing only proceeds after successful OTP verification.
                        </p>
                        <p className="mb-3">
                            However, please be aware that if applicants are unable or unwilling to share the OTP for any reason, we will be unable to process the certificate. Such cases will be considered as <strong>'NOT PROCESSED DUE TO NON-COOPERATION BY CLIENT,'</strong> and no refund will be provided in such instances.
                        </p>
                        <p>
                            It is important to note that we explicitly obtain acceptance from the applicant before submitting the application, which includes sharing of details and accepting this condition. This acceptance is mandatory for submitting the form on the portal, and applications cannot proceed without it.
                        </p>
                    </div>
                </div>

                {/* Turn Around Time */}
                <div className="mb-8">
                    <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide rounded-t">
                        Turn Around Time (TAT)
                    </div>
                    <div className="bg-white p-5 border border-blue-200 rounded-b text-gray-800 leading-relaxed">
                        <p>
                            Processing of the application starts after OTP (One Time Password) sent on client's mobile is provided to our representative. After Application is processed, Certificate is generated & finally delivered to Client's Registered Email. The whole process generally takes <strong>1 – 3 working days</strong>. However, at times when System Upgradation is taking place, generation of certificate may be delayed anywhere between <strong>8 – 15 working days</strong>.
                        </p>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Terms and Conditions</h3>
                    <p className="text-gray-700 mb-2">Welcome to eudyogonline.com</p>
                    <p className="text-gray-700 mb-4">
                        These terms and conditions outline the rules and regulations for the use of Udyamregister Website, located at{' '}
                        <Link to="/terms-of-service" className="text-blue-600 hover:underline">https://eudyogonline.com/terms-of-service</Link>
                    </p>

                    <ol className="list-decimal list-outside ml-6 space-y-4 text-gray-800">
                        <li>
                            <strong>Acceptance of Terms</strong>
                            <p className="mt-1 text-gray-700">
                                By accessing or using eudyogonline.com, you agree to comply with and be bound by the following terms and conditions. Please don't use the website if you disagree with these terms.
                            </p>
                        </li>
                        <li>
                            <strong>Website Usage</strong>
                            <p className="mt-1 text-gray-700">
                                You must be of legal age and meet the eligibility criteria set by the website to use its services. You are responsible for maintaining the confidentiality of your account information and password.
                            </p>
                        </li>
                        <li>
                            <strong>Services Offered</strong>
                            <p className="mt-1 text-gray-700">
                                The website offers services related to Udyam Registration as per government guidelines. Any changes to the services provided will be communicated on the website.
                            </p>
                        </li>
                        <li>
                            <strong>User Responsibilities</strong>
                            <p className="mt-1 text-gray-700">
                                You must provide accurate and complete information during registration and throughout your use of the website. While using the website, you agree to abide by all applicable laws and regulations.
                            </p>
                        </li>
                        <li>
                            <strong>Privacy Policy</strong>
                            <p className="mt-1 text-gray-700">
                                Your use of the website is also governed by our Privacy Policy, which can be accessed at{' '}
                                <Link to="/privacy-policy" className="text-blue-600 hover:underline">https://eudyogonline.com/privacy-policy</Link>
                            </p>
                        </li>
                        <li>
                            <strong>Payment Terms</strong>
                            <p className="mt-1 text-gray-700">
                                You agree to pay the specified fees for the services provided. Refund and cancellation policies, if any, will be detailed on the website.
                            </p>
                        </li>
                        <li>
                            <strong>Changes to Terms and Conditions</strong>
                            <p className="mt-1 text-gray-700">
                                These terms are subject to change at any time, with notice. When changes are posted online, they take effect.
                            </p>
                        </li>
                        <li>
                            <strong>Contact Information</strong>
                            <p className="mt-1 text-gray-700">
                                For questions or concerns about these terms and conditions, please contact us at{' '}
                                <Link to="/contact" className="text-blue-600 hover:underline">http://eudyogonline.com/contact</Link>
                            </p>
                        </li>
                        <li>
                            <strong>Agreement Acceptance</strong>
                            <p className="mt-1 text-gray-700">
                                By using the website's services, you acknowledge that you have read, understood, and agreed to these terms and conditions.
                            </p>
                        </li>
                    </ol>
                </div>

                {/* Disclaimer */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h3>
                    <p className="text-gray-700 mb-4">
                        We disclaim any guarantees and conditions connected to our website and the use of our website to the fullest extent permissible by law. This disclaimer in no way:
                    </p>
                    <ul className="list-disc list-outside ml-6 space-y-2 text-gray-700 mb-4">
                        <li>Limit or exclude both our and your liability for wrongful death or personal injury;</li>
                        <li>Limit or exclude both our and your liability for fraud or fraudulent misrepresentation;</li>
                        <li>Limit or exclude both our and your liability in any way that is not permitted by applicable law;</li>
                        <li>Exclude both our and your liability in any way that may not be excluded under applicable law.</li>
                    </ul>
                    <p className="text-gray-700">
                        The exclusions and restrictions on liability outlined in this Section and other parts of this disclaimer: (a) are contingent upon the conditions specified in the preceding paragraph. (b) extend their influence over all potential liabilities that may arise within the scope of this disclaimer, encompassing liabilities arising from contractual agreements, tortious acts, and breaches of statutory duty.
                    </p>
                </div>

            </div>
        </section>
    );
}
