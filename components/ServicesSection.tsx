"use client"
import { Button, Card } from "@nextui-org/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

const services = [
  {
    title: "Pre-Purchase Inspections",
    description: "Thorough mechanical and structural evaluation of a used vehicle to identify safety, compliance and hidden issues to ensure you can make a decision with all necessary insights.",
    hasButton: true,
  },
  {
    title: "Vehicle Servicing",
    description: "Professional servicing for all makes and models. Regular servicing improves your vehicle's efficiency and reliability and will prolong its lifespan.",
    hasButton: false,
  },
  {
    title: "Fleet Servicing",
    description: "Dependable fleet maintenance to reduce downtime, manage expenses, ensure compliance, and keep your business vehicles safe and operational every day.",
    hasButton: false,
  },
  {
    title: "Brake Repairs",
    description: "Complete inspections and repairs to preserve the lifespan of your rotors and keep your vehicle performing smoothly on the road and maintaining optimal stopping distances.",
    hasButton: false,
  },
  {
    title: "Suspension Repairs",
    description: "Suspension repairs and diagnostics, keeping your vehicle safe, controllable, and smooth on the road and protecting your tires and other parts from costly wear and tear.",
    hasButton: false,
  },
  {
    title: "WOF Repairs",
    description: "Repairs to ensure your vehicle meets strict safety standards. We have a business partner to ensure a timely and stress-free Warrant of Fitness inspection.",
    hasButton: false,
  },
  {
    title: "Computer Diagnostics",
    description: "Advanced diagnostics to enable early problem detection, prevent costly breakdowns, and drastically speed up repair times.",
    hasButton: false,
  },
]

const ServicesSection = () => {
  const router = useRouter()

  return (
    <div className="w-full flex flex-col justify-center items-center py-16 px-4 bg-white">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h2>
      <motion.p
        className="text-gray-600 text-center max-w-2xl mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        We come to you! Professional mobile mechanic services across Auckland.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#008785]">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {service.description}
              </p>
              {service.hasButton && (
                <Button
                  color="primary"
                  className="mt-4 font-semibold"
                  onPress={() => router.push('/booking')}
                >
                  Book Inspection
                </Button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex flex-col items-center p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-[#008785] text-center mb-6">
            We Come to You!
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-full md:w-1/3">
              <Image
                src="/work/osmozstuff.png"
                alt="Osmoz Mobile Service Team"
                width={500}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg text-gray-700 text-left">
                No need to worry about getting your car to a garage. Our fully equipped mobile service van brings our expert team right to your doorstep, anywhere in Auckland. Whether you&apos;re at home, work, or stuck somewhere - we&apos;ll be there to get you back on the road!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-800 p-4 mt-4">
            <span className="text-[#008785] text-2xl">&#10003;</span>
            <p className="font-medium">
              Modern diagnostic equipment for accurate repairs
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
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
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <p className="text-lg text-gray-600">
            Open Monday to Saturday
            <br />
            9:00 AM to 7:00 PM
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ServicesSection
