"use client"

import { useState } from "react"
import { Card, CardBody, Modal } from "@nextui-org/react"
import Image from "next/image"

const workItems = [
  { type: "image", src: "/logo2.jpg", alt: "Engine Repair" },
  { type: "image", src: "/logo2.jpg", alt: "Brake Replacement" },
  { type: "image", src: "/logo2.jpg", alt: "Paint Job" },
  { type: "image", src: "/logo2.jpg", alt: "Tire Rotation" },
  { type: "image", src: "/logo2.jpg", alt: "Oil Change" },
  { type: "image", src: "/logo2.jpg", alt: "Transmission Service" },
]

const WorkShowcaseSection = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Recent Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workItems.map((item, index) => (
            <Card key={index} isPressable >
              <CardBody className="p-0">
                
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
              
  
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkShowcaseSection

