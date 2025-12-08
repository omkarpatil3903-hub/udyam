import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function RegistrationSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        applicantName: '',
        mobile: '',
        email: '',
        officeAddress: '',
        pincode: '',
        state: '',
        district: '',
        socialCategory: '',
        orgType: '',
        pan: '',
        bankAccount: '',
        ifsc: '',
        businessName: '',
        commencementDate: '',
        mainActivity: '',
        additionalDetails: '',
        employeesMale: '',
        employeesFemale: '',
        employeesOther: '',
        verificationCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotalEmployees = () => {
        return (parseInt(formData.employeesMale || 0) + parseInt(formData.employeesFemale || 0) + parseInt(formData.employeesOther || 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Generate a random Application ID
            const appId = `UDYAM-${Math.floor(Math.random() * 10000000)}`;

            await addDoc(collection(db, "registrations"), {
                ...formData,
                totalEmployees: calculateTotalEmployees(),
                paymentStatus: 'Pending',
                step: 1, // Default step
                id: appId,
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp()
            });

            alert(`Application Submitted Successfully! Your Application ID is ${appId}. Please note it for future reference.`);
            // Reset form
            setFormData({
                applicantName: '', mobile: '', email: '', officeAddress: '', pincode: '', state: '', district: '',
                socialCategory: '', orgType: '', pan: '', bankAccount: '', ifsc: '', businessName: '',
                commencementDate: '', mainActivity: '', additionalDetails: '',
                employeesMale: '', employeesFemale: '', employeesOther: '', verificationCode: ''
            });

        } catch (error) {
            console.error("Error submitting document: ", error);
            alert("Error submitting application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="container mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch font-sans">

            {/* Left Column: Registration Form (1 col) */}
            <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                {/* Form Header */}
                <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                    UDYAM REGISTRATION FORM ONLINE <br />
                    <span className="text-xs font-normal opacity-90">उद्यम पंजीकरण फॉर्म ऑनलाइन</span>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                    {/* Row 1: Name */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">APPLICANT NAME / आवेदक का नाम <span className="text-red-600">*</span></label>
                        <input name="applicantName" value={formData.applicantName} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 2: Mobile */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Mobile Number / मोबाइल संख्या <span className="text-red-600">*</span></label>
                        <input name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 3: Email */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Email Id / ईमेल आईडी <span className="text-red-600">*</span></label>
                        <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 4: Address */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Office Address / कार्यालय का पता <span className="text-red-600">*</span></label>
                        <input name="officeAddress" value={formData.officeAddress} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 mb-2 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 5: Pincode, State, District */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Pincode / पिन कोड <span className="text-red-600">*</span></label>
                            <input name="pincode" value={formData.pincode} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">State / राज्य <span className="text-red-600">*</span></label>
                            <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                <option value="">Select State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Karnataka">Karnataka</option>
                                {/* Add more states as needed */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">District / जिला <span className="text-red-600">*</span></label>
                            <select name="district" value={formData.district} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                <option value="">Select District</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Bangalore">Bangalore</option>
                                {/* Add more districts as needed */}
                            </select>
                        </div>
                    </div>

                    {/* Row 6: Social & Org Type */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm space-y-3">
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Social Category / सामाजिक श्रेणी <span className="text-red-600">*</span></label>
                            <select name="socialCategory" value={formData.socialCategory} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                <option value="">--Select--</option>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Type Of Organisation / संगठन का प्रकार <span className="text-red-600">*</span></label>
                            <select name="orgType" value={formData.orgType} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                <option value="">--Select--</option>
                                <option value="Proprietary">Proprietary</option>
                                <option value="Hindu Undivided Family">Hindu Undivided Family</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Co-Operative">Co-Operative</option>
                                <option value="Private Limited Company">Private Limited Company</option>
                                <option value="Public Limited Company">Public Limited Company</option>
                                <option value="Self Help Group">Self Help Group</option>
                                <option value="Trust">Trust</option>
                                <option value="Society">Society</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 7: PAN */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Pan Card Number / पैन कार्ड नंबर <span className="text-red-600">*</span></label>
                        <input name="pan" value={formData.pan} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 uppercase rounded-sm" />
                    </div>

                    {/* Row 8: Bank & IFSC (New) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Bank Account Number / बैंक खाता संख्या</label>
                            <input name="bankAccount" value={formData.bankAccount} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Ifsc Code / आईएफएससी कोड</label>
                            <input name="ifsc" value={formData.ifsc} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 uppercase rounded-sm" />
                        </div>
                    </div>

                    {/* Row 9: Business Name */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Business Name / व्यवास्यक नाम</label>
                        <input name="businessName" value={formData.businessName} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 10: Date, Main Activity */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm space-y-3">
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Date Of Commencement Of Business / व्यवसाय के प्रारंभ होने की तिथि</label>
                            <input name="commencementDate" value={formData.commencementDate} onChange={handleChange} required type="date" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                        </div>
                        <div>
                            <label className="block text-gray-800 font-bold mb-1">Main Business Activity Of Enterprise / उद्यम की मुख्य व्यावसायिक गतिविधि</label>
                            <select name="mainActivity" value={formData.mainActivity} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                <option value="">--Select--</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Services">Services</option>
                                <option value="Trading">Trading</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 11: Additional Details (New) */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-1">Additional Details About Business / व्यापार के बारे में अतिरिक्त विवरण</label>
                        <input name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                    </div>

                    {/* Row 12: Employees */}
                    <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                        <label className="block text-gray-800 font-bold mb-2">Number of persons employed / व्यक्ति नियोजित</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <span className="block text-xs mb-1">Male / पुरुष</span>
                                <input name="employeesMale" value={formData.employeesMale} onChange={handleChange} type="number" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Female / महिला</span>
                                <input name="employeesFemale" value={formData.employeesFemale} onChange={handleChange} type="number" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Other / अन्य</span>
                                <input name="employeesOther" value={formData.employeesOther} onChange={handleChange} type="number" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                            </div>
                            <div>
                                <span className="block text-xs mb-1">Total / संपूर्ण</span>
                                <input value={calculateTotalEmployees()} type="number" className="w-full border border-gray-300 px-2 py-1 bg-gray-100 rounded-sm" readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Agreement */}
                    <div className="bg-orange-100 p-3 border border-orange-200 rounded-sm">
                        <label className="flex items-start space-x-2">
                            <input type="checkbox" required className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500" />
                            <span className="text-xs font-semibold text-gray-800">
                                I AGREE TO THE <a href="#" className="text-blue-600 underline">TERMS OF SERVICE [UPDATED]</a>
                                <br />
                                I, the applicant agree to share Details / Passcodes etc as & when required for the purpose of Udyam Certificate Generation.[UPDATED]
                            </span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="space-y-2">
                        <label className="block text-gray-800 font-bold text-xs">Verfication Code</label>
                        <div className="flex gap-2 items-center">
                            <div className="flex-grow max-w-[200px]">
                                <input name="verificationCode" value={formData.verificationCode} onChange={handleChange} type="text" placeholder="Verification Code *" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>
                            {/* Captcha Placeholder */}
                            <div className="bg-black text-white px-4 py-2 font-mono tracking-widest text-lg font-bold">08222</div>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className={`bg-blue-600 text-white font-bold py-3 px-8 rounded shadow hover:bg-blue-700 w-full md:w-auto uppercase text-sm transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                    </button>

                </form>
            </div>

            {/* Right Column: Instructions (1 col) */}
            <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden flex flex-col">
                <div className="bg-blue-700 text-white text-center py-3 font-bold text-xs uppercase tracking-wide">
                    READ THE INSTRUCTION TO FILL UDYAM APPLICATION FORM <br />
                    <span className="opacity-90 font-normal">उद्यम आवेदन पत्र भरने के लिए निर्देश पढ़ें</span>
                </div>
                {/* Scrollable container if content is too long compared to form, or just regular */}
                <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                    <p>
                        <span className="font-bold">Applicant Name :</span> Name Of The Applicant Should Exactly Match With His Name Printed On Aadhaar Card. <br />
                        <span className="text-gray-600">आवेदक का नाम आधार कार्ड पर छपे उसके नाम से बिल्कुल मेल खाना चाहिए।</span>
                    </p>
                    <p>
                        <span className="font-bold">Mobile Number :</span> Mobile Numbers Must Be Ten Digits. Do Not Add Country Code (+91). <br />
                        <span className="text-gray-600">मोबाइल नंबर दस अंकों का होना चाहिए। कंट्री कोड (+91) न जोड़ें।</span>
                    </p>
                    <p>
                        <span className="font-bold">Email Id :</span> Enter A Legitimate Email Address, Since All Communications Will Be Done On Registered Email Address Only. <br />
                        <span className="text-gray-600">अपना वैध ईमेल पता दर्ज करें, क्योंकि सभी कम्युनिकेशन केवल रजिस्टर्ड ईमेल पते पर ही किए जाएंगे।</span>
                    </p>
                    <p>
                        <span className="font-bold">Plant Address :</span> Please Provide Your Complete Plant Address, Including State And Pincode, In The Plant Address Field. <br />
                        <span className="text-gray-600">प्लांट का पूरा पता, राज्य और पिनकोड सहित डाले|</span>
                    </p>
                    <p>
                        <span className="font-bold">Office Address :</span> Enter Your Complete Office Address Including State, And Pin Code. <br />
                        <span className="text-gray-600">कार्यालय का पूरा पता, राज्य और पिनकोड सहित, दर्ज करें।</span>
                    </p>
                    <p>
                        <span className="font-bold">Annual Turnover :</span> Applicant Need To Mention His / Her Annual Turnover. <br />
                        <span className="text-gray-600">आवेदक अपना वार्षिक कारोबार दर्ज कर सकता है</span>
                    </p>
                    <p>
                        <span className="font-bold">Social Category :</span> Choose Your Social Category From The Drop Down Menu, Viz, General, OBC, SC, ST. <br />
                        <span className="text-gray-600">ड्रॉप डाउन मेनू से अपनी सामाजिक श्रेणी का चयन करे, जैसे सामान्य, ओबीसी, एससी, एसटी।</span>
                    </p>
                    <p>
                        <span className="font-bold">PAN Card Number :</span> Please Enter Your 10 Digit Pan Card Number. <br />
                        <span className="text-gray-600">अपने १० अंको का पैन कार्ड नंबर दर्ज करें।</span>
                    </p>
                    <p>
                        <span className="font-bold">Bank Account Number :</span> Enter Your Bank Account Number. <br />
                        <span className="text-gray-600">अपना बैंक खाता नंबर दर्ज करें |</span>
                    </p>
                    <p>
                        <span className="font-bold">IFSC Code :</span> Please Enter The IFSC Code Of Your Bank Branch. <br />
                        <span className="text-gray-600">अपने बैंक के ब्रांच का IFSC कोड दर्ज करे |</span>
                    </p>
                    <p>
                        <span className="font-bold">Date Of Commencement Of Business :</span> Mention The Date Your Business began Operations. <br />
                        <span className="text-gray-600">व्यवसाय के प्रारंभ होने की तारीख दर्ज करें, जिसे प्रमाणपत्र पर उल्लिखित किया जाएगा।</span>
                    </p>
                    <p>
                        <span className="font-bold">Type Of Organization :</span> Please Select Your Organization Type From Drop Down Menu. <br />
                        <span className="text-gray-600">आवेदकों को अपने संगठन के प्रकार को ड्रॉप डाउन मेनू से चुनना आवश्यक है, क्योंकि यह प्रमाणपत्र पर छापा जाएगा।</span>
                    </p>
                    <p>
                        <span className="font-bold">Main Business Activity Of Enterprise :</span> Please Choose The Primary Business Activity From The Drop Down Menu Viz Manufacturing / Trading / Service Provider. <br />
                        <span className="text-gray-600">उद्यम की मुख्य व्यवसायिक गतिविधि का चयन करें viz मैन्युफैक्चरिंग / ट्रेडिंग / सर्विस प्रोवाइडर ।</span>
                    </p>
                    <p>
                        <span className="font-bold">ADDITIONAL BUSINESS DETAILS :</span> Mention What Your Busiess Does Ex : Computer Manufacturar / Cloth Shop / Road Contractor. <br />
                        <span className="text-gray-600">उल्लेख करें कि आपका व्यवसाय क्या है, उदाहरणार्थ: कंप्यूटर निर्माता/कपड़े की दुकान/सड़क ठेकेदार।</span>
                    </p>
                    <p>
                        <span className="font-bold">Number Of Employees :</span> Please Indicate The Number Of Current Employees In Your Organization. <br />
                        <span className="text-gray-600">कृपया आपके संगठन में कार्यरत कर्मचारियों की संख्या दर्ज करें।</span>
                    </p>
                    <p>
                        <span className="font-bold">Investment In Plant & Machinery / Equipment :</span> Enter The Total Investment Made By The Applicant In Plant Machinery, Equipment Etc. <br />
                        <span className="text-gray-600">संयंत्र, मशीनरी, और उपकरण आदि में किए गए निवेश का योगदान करें।</span>
                    </p>
                    <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[10px] text-gray-700">
                        <span className="font-bold">SUBMIT APPLICATION :</span> Once All Required Information Has Been Entered And Documents Have Been Attached Click On The “Submit Application” Button. <br />
                        <span className="text-gray-600">कृपया सभी आवश्यक जानकारी और दस्तावेज जमा किए जाने पर "आवेदन सबमिट करें" बटन पर क्लिक करें।</span>
                    </div>
                </div>
            </div>

        </section>
    );
}
