'use client'
import React, { use, useEffect } from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input } from '@nextui-org/react'
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { on } from 'events';
import MultiStepForm from './form/FormWrapper';

export const BookingProcess = () => {
  const [action, setAction] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<number>(1);
  const [addressData, setAddressData] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<any>({});

  const onSubmitStepOne = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    // Add address data to form data
    const fullData = { ...data, ...formData };
    setFormData(fullData);
    //setAction(`submit ${JSON.stringify(fullData)}`);
    console.log("Form submitted:");
    console.log(fullData);
    setStep(2);
  }

  const onSubmitStepTwo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    // Add address data to form data
    const fullData = { ...formData, ...data, address: addressData };
    setFormData(fullData);
    setAction(`submit ${JSON.stringify(fullData)}`);
    console.log("Form submitted:");
    console.log(fullData);
  }

  const onSubmitStepThree = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    // Add address data to form data
    const fullData = { ...formData, ...data, address: addressData };
    setFormData(fullData);
    setAction(`submit ${JSON.stringify(fullData)}`);
    console.log("Form submitted:");
    console.log(fullData);
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#00a79e] to-[#008080] px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-2"
      >
        <Image
          src="/logotransparent.png"
          alt="Osmoz Logo"
          as={NextImage}
          width={100}
          height={100}
          className="rounded-full bg-white"
        />
      </motion.div>
      <motion.h1
        className="text-xl md:text-4xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block">
          <span className="animate-text-slide overflow-hidden">
            <span className="inline-block animate-slide-up">
              <span className="inline-block">Book your appointment today!</span>
            </span>
          </span>
        </span>
      </motion.h1>
      <motion.div
        className="text-xl md:text-2xl text-white mb-8 max-w-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='w-full flex justify-center'>
          <MultiStepForm />
          <div className={`w-full flex flex-col items-center ${step !== 2 ? 'hidden' : ''}`}>
            <span className="text-gray-700 mb-2">Type your exact address.</span>
            <Form
              className={`w-full bg-white rounded-xl shadow-lg p-4 flex flex-col gap-6 ${step !== 1 ? 'hidden' : ''}`}
              onSubmit={onSubmitStepTwo}
              validationBehavior="aria"
            >

              <div className="flex gap-4 justify-center mt-8">
                <Button color="primary" type="button" className="px-8 py-2 rounded-lg font-bold text-white shadow-md" onPress={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" color="primary" className="px-8 py-2 rounded-lg font-bold shadow-md" onPress={() => setStep(3)}>
                  Next
                </Button>
              </div>
            </Form>
          </div>
          <div className={`w-full flex flex-col items-center gap-6 ${step !== 3 ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you!</h2>
            <p className="text-gray-700 mb-6">Your appointment has been booked successfully. We will contact you soon with the details.</p>
          </div>

        </div>
      </motion.div>
    </div>

  )
}


