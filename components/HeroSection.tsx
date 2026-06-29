"use client"
import { Button, Image } from "@nextui-org/react"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const router = useRouter()
  return (
    <div className="relative min-h-[85vh] w-full flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00a79e] via-[#00918a] to-[#008080]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/logotransparent.png"
            alt="Osmoz Logo"
            width={120}
            className="rounded-full bg-white p-2 shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            Mobile Mechanic &bull; Auckland, NZ
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          We Come to{" "}
          <span className="relative">
            <span className="relative z-10">You</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/30 rounded-full -z-0" />
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Professional mobile car servicing &amp; inspections across Auckland.
          Expert mechanics bringing quality care directly to your doorstep.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Button
            size="lg"
            color="secondary"
            variant="shadow"
            className="font-semibold px-8 rounded-full text-base"
            onPress={() => router.push('/booking')}
            startContent={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            Book Inspection
          </Button>
          <Button
            size="lg"
            variant="bordered"
            className="font-semibold px-8 rounded-full text-base border-white/40 text-white hover:bg-white/10"
            onPress={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            endContent={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            }
          >
            Our Services
          </Button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </div>
  )
}

export default HeroSection
