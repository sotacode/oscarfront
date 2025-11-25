'use client'
import React, { use } from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input } from '@nextui-org/react'
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { BookingProcess } from '@/components/booking/bookingprocess';
import MultiStepForm from '@/components/booking/form/FormWrapper';

export default function Booking() {
  const [action, setAction] = React.useState<string | null>(null);
  return (
    <section className="min-h-screen w-full bg-gray-100 position-static">
      <BookingProcess />
      {/* <MultiStepForm /> */}
		</section>
    
  )
}
