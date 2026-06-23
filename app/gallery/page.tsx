'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardBody } from "@nextui-org/react"

const galleryImages = [
  { src: "/work/ban.jpg", alt: "Engine Repair" },
  { src: "/work/ban2.jpg", alt: "Brake Replacement" },
  { src: "/work/chain.jpg", alt: "Suspension Work" },
  { src: "/work/changeoil.jpg", alt: "Oil Change Service" },
  { src: "/work/osmozworking1.jpg", alt: "Mobile Mechanic at Work" },
  { src: "/work/osmozworking2.jpg", alt: "Vehicle Diagnostics" },
]

const videos = [
  {
    title: "Pre-Purchase Inspection Overview",
    description: "Watch how we conduct a thorough pre-purchase inspection to help you make an informed decision.",
    thumbnail: "/work/osmozworking1.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Mobile Mechanic Service in Action",
    description: "See our fully equipped mobile service van in action, bringing professional car care to your doorstep.",
    thumbnail: "/work/osmozworking2.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

export default function GalleryPage() {
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
            Our Work
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See the quality of our work and the services we provide
          </motion.p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Photo Gallery
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A look at our recent work and the quality service we deliver
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card isPressable className="overflow-hidden">
                  <CardBody className="p-0">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-700 text-center">{image.alt}</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Inspection Videos
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Watch our pre-purchase inspection process and see the level of detail we provide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
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
