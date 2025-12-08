import React from 'react';

export default function InfoSection({ title, children, bg = "white" }) {
    return (
        <section className={`py-16 px-4 md:px-8 ${bg === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center border-b pb-4">{title}</h2>
                <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                    {children}
                </div>
            </div>
        </section>
    );
}
