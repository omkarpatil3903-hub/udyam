import React from 'react';

export default function StandardOperatingProcedure() {
    const steps = [
        {
            id: 1,
            color: "bg-orange-600",
            textColor: "text-black",
            circleColor: "bg-orange-600",
            text: "Complete The Application For Udyam Registration On Our Website."
        },
        {
            id: 2,
            color: "bg-yellow-200",
            textColor: "text-black",
            circleColor: "bg-yellow-200",
            text: "Check All Details On Application Form And Then Submit"
        },
        {
            id: 3,
            color: "bg-purple-600",
            textColor: "text-white",
            circleColor: "bg-purple-600",
            text: "Make A Successful Payment Towards Registration"
        },
        {
            id: 4,
            color: "bg-orange-500",
            textColor: "text-black",
            circleColor: "bg-orange-500",
            text: "Our Executive Contact You For Further Process"
        },
        {
            id: 5,
            color: "bg-blue-400",
            textColor: "text-black",
            circleColor: "bg-blue-400",
            text: "When Certificate Is Generated It Will Sent On Your Registered Email Id"
        }
    ];

    return (
        <section className="container mx-auto px-2 py-8 font-sans">
            <h2 className="text-center text-blue-900 text-3xl font-bold mb-6">Standard Operating Procedure</h2>

            <div className="bg-orange-50/80 border border-orange-100 p-6 md:p-10 rounded-lg shadow-sm">
                <h3 className="text-center font-extrabold text-xl md:text-2xl mb-12 uppercase tracking-wide">
                    COMPLETE PROCESS TO OBTAIN UDYAM REGISTRATION CERTIFICATE
                </h3>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">

                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center w-full md:w-1/5 relative z-10 group hover:scale-105 transition-transform duration-300">
                                {/* Number Circle */}
                                <div className={`${step.circleColor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md border-2 border-white mb-6 relative z-10`}>
                                    {step.id}
                                </div>

                                {/* Content Box */}
                                <div className={`${step.color} ${step.textColor} p-4 text-center font-bold text-sm h-32 flex items-center justify-center w-full shadow-md rounded relative`}>
                                    {step.text}
                                    {/* Triangle pointer at bottom - decorative match for some designs, implied in flow */}
                                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${step.color} rotate-45`}></div>
                                </div>
                            </div>

                            {/* Arrow (Hidden on mobile, visible on desktop between items) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block text-4xl p-2 text-black font-bold">
                                    &#8594;
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                </div>
            </div>
        </section>
    );
}
