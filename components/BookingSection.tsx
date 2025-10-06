
import { Button } from "@nextui-org/button";
import React from "react";
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";




const BookingSection = ({ sectionRef }: any) => {
  const router = useRouter()

  return (
    <section className="px-4 bg-gray-100" ref={sectionRef}>
      <div className="mx-auto pt-16 pb-16 text-center max-w-3xl">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              className="font-semibold"
              onPress={() => router.push('/booking')}
            >
              Book your appointment!
            </Button>
          </motion.div>
      </div>
    </section>
  )
}

export default BookingSection

