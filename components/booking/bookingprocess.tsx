'use client'
import React, { use } from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input } from '@nextui-org/react'
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export const BookingProcess = () => {
  const [action, setAction] = React.useState<string | null>(null);
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#00a79e] to-[#008080] px-4">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-2"
      >
        <Image
          src="/logotransparent.png" // Replace with your actual logo
          alt="Osmoz Logo"
          as={NextImage}
          width={150}
          height={150}
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
        className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Form
          className="w-full bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));
            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            name="fullname"
            placeholder="Enter your name"
            type="text"
            classNames={{
              inputWrapper: "bg-white/60 border border-gray-200 rounded-lg",
              label: "font-semibold text-gray-700 mb-1",
              input: "text-lg py-3",
            }}
          />
          <Input
            isRequired
            label="Phone Number"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            classNames={{
              inputWrapper: "bg-white/60 border border-gray-200 rounded-lg",
              label: "font-semibold text-gray-700 mb-1",
              input: "text-lg py-3",
            }}
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            classNames={{
              inputWrapper: "bg-white/60 border border-gray-200 rounded-lg",
              label: "font-semibold text-gray-700 mb-1",
              input: "text-lg py-3",
            }}
          />
          <div className="flex gap-4 justify-center mt-4">
            <Button color="primary" type="submit" className="px-8 py-2 rounded-lg font-bold text-white shadow-md">
              Submit
            </Button>
            <Button type="reset" variant="flat" className="px-8 py-2 rounded-lg font-bold shadow-md">
              Reset
            </Button>
          </div>
          {action && (
            <div className="text-sm text-gray-600 mt-2">
              Action: <code className="bg-gray-100 px-2 py-1 rounded">{action}</code>
            </div>
          )}
        </Form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" color="secondary" variant="shadow" className="font-semibold">
          Book Now
        </Button>
      </motion.div>
    </div>
    
  )
}


