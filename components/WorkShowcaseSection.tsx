"use client"

import { Card, CardBody } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"
import Lightbox from "./Lightbox"

const workItems = [
  { type: "image", src: "/work/ban.jpg", alt: "Engine Repair" },
  { type: "image", src: "/work/ban2.jpg", alt: "Brake Replacement" },
  { type: "image", src: "/work/chain.jpg", alt: "Suspension Work" },
  { type: "image", src: "/work/changeoil.jpg", alt: "Oil Change Service" },
  { type: "image", src: "/work/osmozworking1.jpg", alt: "Mobile Mechanic at Work" },
  { type: "image", src: "/work/osmozworking2.jpg", alt: "Vehicle Diagnostics" },
]

const WorkShowcaseSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="py-12 px-4 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A look at the quality service we deliver across Auckland
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workItems.map((item, index) => (
            <Card
              key={index}
              isPressable
              className="overflow-hidden card-hover border border-gray-100"
              onPress={() => openLightbox(index)}
            >
              <CardBody className="p-0 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <p className="text-white font-medium text-sm">{item.alt}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <Lightbox
        images={workItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % workItems.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + workItems.length) % workItems.length)}
      />
    </section>
  )
}

export default WorkShowcaseSection
