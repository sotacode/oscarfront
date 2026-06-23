import React from 'react'
import { Form } from './form';

export const ContactForm = () => {

    return (
        <section id="contact" className="w-full flex flex-col gap-4 max-w-4xl mx-auto py-16 px-4 bg-white">
            <div className="flex flex-col gap-4 text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Get in Touch</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Need reliable mobile car servicing in Auckland? Get in touch for honest advice and free no-obligation quotes.
                </p>
            </div>
            <Form />
        </section>
    )
}
