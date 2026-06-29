import React from 'react'
import { Form } from './form';

export const ContactForm = () => {

    return (
        <section id="contact" className="w-full py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-8">
                    <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
                        Contact Us
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Need reliable mobile car servicing in Auckland? Get in touch for honest advice and free no-obligation quotes.
                    </p>
                </div>

                {/* Form card */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                    <Form />
                </div>
            </div>
        </section>
    )
}
