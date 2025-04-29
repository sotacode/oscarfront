"use client"
import { Button, Card } from "@nextui-org/react"
import { motion } from "framer-motion"
import Image from "next/image"

const ServicesSection = () => {
  const services = [
    {
      title: "Pre-Purchase Inspection",
      description: "Comprehensive vehicle inspection before your next car purchase",
    },
    {
      title: "WOF Repairs & Certification", 
      description: "Partner-assisted WOF services with priority inspection and cost-effective solutions",
    },
    {
      title: "Front End Maintenance",
      description: "Specialized service including brakes, shock absorbers, CV joints, steering components, radiator, and more",
    },
    {   
      title: "Preventive Maintenance",
      description: "Oil and filter changes, cooling system maintenance, brake service and pad replacement",
    },
  ]

  return (
    <div className="w-full flex flex-col justify-center items-center py-12 px-4 bg-white">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mb-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#008785]">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-[#008785] text-center mb-4">
            We Come to You!
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-1/3">
              <Image
                src="/work/osmozstuff.png"
                alt="Osmoz Mobile Service Team"
                width={500}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg text-gray-700 text-left pl-8">
                No need to worry about getting your car to a garage. Our fully equipped mobile service van brings our expert team right to your doorstep, anywhere in Auckland. Whether you&apos;re at home, work, or stuck somewhere - we&apos;ll be there to get you back on the road!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-800 p-4">
            <span className="text-[#008785] text-2xl">✓</span>
            <p className="font-medium">
              Modern diagnostic equipment for accurate repairs
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
            <span className="flex items-center">
              <svg className="w-5 h-5 text-[#008785] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              All Auckland Coverage
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 text-[#008785] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fast Response Time
            </span>
          </div>
        </div>
        <div className=" bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">
            Open Monday to Saturday
            <br/>
            9:00 AM to 7:00 PM
          </p>
        </div>

      </motion.div>
    </div>
  )
}

export default ServicesSection
