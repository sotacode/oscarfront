'use client'
import Image from "next/image"
import { Card, CardBody } from "@nextui-org/react"
import { useState } from "react"
import Lightbox from "@/components/Lightbox"

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
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Mobile Mechanic Service in Action",
    description: "See our fully equipped mobile service van in action, bringing professional car care to your doorstep.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#00a79e] via-[#00918a] to-[#008080] py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Work
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            See the quality of our work and the services we provide
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 72C120 64 240 48 360 42C480 36 600 40 720 48C840 56 960 68 1080 70C1200 72 1320 64 1380 60L1440 56V80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A look at our recent work and the quality service we deliver
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card
                key={index}
                isPressable
                className="overflow-hidden card-hover border border-gray-100 bg-white"
                onPress={() => openLightbox(index)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <p className="text-white font-medium text-sm">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
              Videos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspection Videos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Watch our pre-purchase inspection process and see the level of detail we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden card-hover border border-gray-100 bg-white">
                <div className="relative aspect-video">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <CardBody className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
      />
    </div>
  )
}
