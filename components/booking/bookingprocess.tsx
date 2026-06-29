'use client'
import React from 'react'
import { motion } from "framer-motion"
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import MultiStepForm from './form/FormWrapper';

export const BookingProcess = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#00a79e] to-[#008080] px-4 py-12">
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
        Book Your Pre-Purchase Inspection
      </motion.h1>
      <motion.div
        className="text-xl md:text-2xl text-white mb-8 max-w-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='w-full flex justify-center'>
          <MultiStepForm />
        </div>
      </motion.div>
    </div>
  )
}
