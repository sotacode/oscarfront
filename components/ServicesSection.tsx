"use client"
import { Button, Card } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const services = [
  {
    title: "Pre-Purchase Inspections",
    description: "Thorough mechanical and structural evaluation of a used vehicle to identify safety, compliance and hidden issues to ensure you can make a decision with all necessary insights.",
    hasButton: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Vehicle Servicing",
    description: "Professional servicing for all makes and models. Regular servicing improves your vehicle's efficiency and reliability and will prolong its lifespan.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Fleet Servicing",
    description: "Dependable fleet maintenance to reduce downtime, manage expenses, ensure compliance, and keep your business vehicles safe and operational every day.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Brake Repairs",
    description: "Complete inspections and repairs to preserve the lifespan of your rotors and keep your vehicle performing smoothly on the road and maintaining optimal stopping distances.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    title: "Suspension Repairs",
    description: "Suspension repairs and diagnostics, keeping your vehicle safe, controllable, and smooth on the road and protecting your tires and other parts from costly wear and tear.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "WOF Repairs",
    description: "Repairs to ensure your vehicle meets strict safety standards. We have a business partner to ensure a timely and stress-free Warrant of Fitness inspection.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Computer Diagnostics",
    description: "Advanced diagnostics to enable early problem detection, prevent costly breakdowns, and drastically speed up repair times.",
    hasButton: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const ServicesSection = () => {
  const router = useRouter()

  return (
    <section id="services" className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional mobile mechanic services across Auckland. We come to you!
          </p>
        </div>

        {/* PPI Card - Full width */}
        <div className="mb-12">
          {services.filter(s => s.hasButton).map((service, index) => (
            <Card key={index} className="p-0 card-hover border border-gray-100 bg-white overflow-hidden m-4">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 flex-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-[#00a79e] text-white">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-5">
                    {service.description}
                  </p>
                  <Button
                    color="primary"
                    className="font-semibold rounded-full"
                    onPress={() => router.push('/booking')}
                    endContent={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    }
                  >
                    Book Inspection
                  </Button>
                </div>
                <div className="hidden md:flex w-2/5 bg-[#00a79e]/5 items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00a79e] mb-2">$150</div>
                    <p className="text-gray-500 text-sm">Starting price &bull; NZD</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Regular services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {services.filter(s => !s.hasButton).map((service, index) => (
            <Card key={index} className="p-0 h-full card-hover border border-gray-100 bg-white">
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-[#00a79e]/10 text-[#00a79e]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* We Come to You section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-2/5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/work/osmozstuff.png"
                  alt="Osmoz Mobile Service Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <span className="inline-block px-4 py-1.5 bg-[#00a79e]/10 rounded-full text-[#00a79e] text-sm font-semibold mb-4">
                Mobile Service
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                We Come to You!
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                No need to worry about getting your car to a garage. Our fully equipped mobile service van brings our expert team right to your doorstep, anywhere in Auckland. Whether you&apos;re at home, work, or stuck somewhere &mdash; we&apos;ll be there to get you back on the road!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00a79e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00a79e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">All Auckland Coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00a79e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00a79e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Fast Response Time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00a79e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00a79e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Modern Diagnostic Equipment</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold text-gray-700">Hours:</span> Monday to Saturday, 9:00 AM &ndash; 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
