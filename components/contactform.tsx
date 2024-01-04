import React from 'react'
import { Form } from './form';


export const ContactForm = () => {

    return (
        <div className="w-full flex flex-col gap-4 max-w-xl mx-auto">
            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-4xl" color='#00a79e'>Contact Us</h1>
                <p className="text-xl">If you have any questions, please fill out the form below and I will get back to you as soon as possible.</p>                
            </div>
            <Form />
        </div>
    )
}
