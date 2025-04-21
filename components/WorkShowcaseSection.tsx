"use client"

import { useState } from "react"
import { Card, CardBody, Modal } from "@nextui-org/react"
import Image from "next/image"

const workItems = [
  { type: "image", src: "/work/ban.jpg", alt: "Engine Repair" },
  { type: "image", src: "/work/ban2.jpg", alt: "Brake Replacement" },
  { type: "image", src: "/work/chain.jpg", alt: "Paint Job" },
  { type: "image", src: "/work/changeoil.jpg", alt: "Tire Rotation" },
  { type: "image", src: "/work/osmozworking1.jpg", alt: "Oil Change" },
  { type: "image", src: "/work/osmozworking2.jpg", alt: "Transmission Service" },
]

const WorkShowcaseSection = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="pt-16 px-4 bg-gray-50">
      <div className="pt-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Our Recent Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workItems.map((item, index) => (
            <Card key={index} isPressable >
              <CardBody className="p-0">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{aspectRatio: "4/3"}}
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

