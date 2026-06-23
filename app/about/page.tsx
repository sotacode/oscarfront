'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardBody } from "@nextui-org/react"

const teamMembers = [
  {
    name: "Oscar",
    role: "Founder & Lead Mechanic",
    bio: "Passionate about delivering honest, reliable mobile mechanic services. With years of experience in the automotive industry, Oscar founded Osmoz to bring professional car care directly to your doorstep.",
    image: "/work/osmozworking1.jpg",
  },
  {
    name: "Team Member",
    role: "Mechanic",
    bio: "Dedicated to providing quality service and ensuring every vehicle is thoroughly inspected and well maintained.",
    image: "/work/osmozworking2.jpg",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#00a79e] to-[#008080] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your trusted mobile mechanic in Auckland
          </motion.p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Osmoz Mobile Mechanic
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Osmoz Mobile Mechanic is a professional mobile mechanic service based in Auckland, New Zealand. We bring expert car repairs, maintenance, and inspections directly to your location &mdash; whether you&apos;re at home, work, or on the roadside.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our fully equipped mobile service van allows us to handle a wide range of automotive services, from routine maintenance to complex diagnostics. We pride ourselves on delivering honest, reliable, and affordable auto care.
              </p>
              <p className="text-lg text-gray-600">
                With a focus on customer satisfaction and quality workmanship, we&apos;ve built a reputation as a trusted partner for vehicle owners across Auckland.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/work/osmozstuff.png"
                alt="Osmoz Mobile Mechanic Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardBody className="text-center p-6">
                <div className="w-16 h-16 bg-[#008785]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#008785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Service</h3>
                <p className="text-gray-600">We use only high-quality parts and stand behind our work with a satisfaction guarantee.</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-6">
                <div className="w-16 h-16 bg-[#008785]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#008785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Turnaround</h3>
                <p className="text-gray-600">We understand the importance of your time and strive to get you back on the road quickly.</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-6">
                <div className="w-16 h-16 bg-[#008785]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#008785]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">We Come to You</h3>
                <p className="text-gray-600">Our mobile service brings expert care directly to your location anywhere in Auckland.</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardBody className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-[#008785] font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
