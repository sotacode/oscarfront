"use client"
import { Button, Image } from "@nextui-org/react"
import { motion } from "framer-motion"

const HeroSection = ({scrollToBooking}:any) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#00a79e] to-[#008080] px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <Image
          src="/logotransparent.png" // Replace with your actual logo
          alt="Osmoz Logo"
          width={150}
          className="rounded-full bg-white p-2"
        />
      </motion.div>
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your Trusted{" "}
        <span className="inline-block">
          <span className="animate-text-slide overflow-hidden">
            <span className="inline-block animate-slide-up">
              <span className="inline-block">Car Expert and MechanicProblem Solver.</span>
            </span>
          </span>
        </span>
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Providing personalized, expert auto care for your vehicle&apos;s needs.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button size="lg" color="secondary" variant="shadow" className="font-semibold" onPress={scrollToBooking}>
          Book Now
        </Button>
      </motion.div>
    </div>
  )
}

export default HeroSection

