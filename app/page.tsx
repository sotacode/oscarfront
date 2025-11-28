'use client'
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { subtitle } from "@/components/primitives";
import { FaWhatsapp, FaFacebook, FaAt } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { ContactForm } from "@/components/contactform";
import { Divider } from "@nextui-org/react";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import { useRef } from "react";
import ServicesSection from "@/components/ServicesSection";
import Script from "next/script";

import seoConfig from "@/config/seo";

export default function Home() {
	const sectionRef = useRef<HTMLDivElement>(null);

	const scrollToSection = () => {
		sectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Structured Data for SEO
	const localBusinessSchema = {
		"@context": "https://schema.org",
		"@type": "AutomotiveBusiness",
		"@id": seoConfig.siteUrl,
		"name": seoConfig.businessName,
		"description": seoConfig.businessDescription,
		"url": seoConfig.siteUrl,
		"telephone": seoConfig.phone,
		"email": seoConfig.email,
		"priceRange": seoConfig.priceRange,
		"image": `${seoConfig.siteUrl}${seoConfig.logo}`,
		"logo": `${seoConfig.siteUrl}${seoConfig.logo}`,
		"address": {
			"@type": "PostalAddress",
			"addressLocality": seoConfig.region,
			"addressCountry": seoConfig.country,
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": "-36.8485",
			"longitude": "174.7633"
		},
		"areaServed": {
			"@type": "City",
			"name": "Auckland",
			"@id": "https://en.wikipedia.org/wiki/Auckland"
		},
		"openingHoursSpecification": {
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"opens": "09:00",
			"closes": "19:00"
		},
		"sameAs": [
			seoConfig.facebook,
			seoConfig.whatsapp
		],
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Mobile Mechanic Services",
			"itemListElement": seoConfig.services.map((service, index) => ({
				"@type": "Offer",
				"itemOffered": {
					"@type": "Service",
					"name": service.name,
					"description": service.description,
					"provider": {
						"@type": "AutomotiveBusiness",
						"name": seoConfig.businessName
					}
				}
			}))
		}
	};

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": seoConfig.businessName,
		"url": seoConfig.siteUrl,
		"logo": `${seoConfig.siteUrl}${seoConfig.logo}`,
		"contactPoint": {
			"@type": "ContactPoint",
			"telephone": seoConfig.phone,
			"contactType": "customer service",
			"areaServed": "NZ",
			"availableLanguage": ["English"]
		}
	};

	return (
		<>
			{/* JSON-LD Structured Data */}
			<Script
				id="local-business-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
			/>
			<Script
				id="organization-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>

			<section className="min-h-screen w-full bg-gray-100 position-static">
				<HeroSection scrollToBooking={scrollToSection} />
				<ServicesSection />
				<IntroductionSection />
				<WorkShowcaseSection />
				<BookingSection sectionRef={sectionRef} />
				<ContactSection />
			</section>
		</>
		// <section className="flex flex-col items-center justify-center gap-4 py-3 md:py-10">
		// 	<div className="flex flex-col w-full">
		// 		<div className="full-w m-auto">
		// 			<Image src="/home/osmoz.png" alt="NextUI" width={200} height={300} />
		// 		</div>
		// 		<div className="mt-8 w-full justify-center items-center text-center flex flex-col">
		// 			<div className="flex text-center justify-center">

		// 				<div className="flex items-center justify-center mt-2 min-w-[300px] w-1/3">
		// 					<FaCheckCircle size={30} color="#00a79e" />
		// 					<h2>
		// 						Preventive maintenance.
		// 					</h2>
		// 				</div>
		// 				<div className="flex items-center justify-center mt-2 w-1/3">
		// 					<FaCheckCircle size={30} color="#00a79e" />
		// 					<h2>
		// 						General diagnosis.
		// 					</h2>
		// 				</div>
		// 				<div className="flex items-center justify-center mt-2 w-1/3">
		// 					<FaCheckCircle size={30} color="#00a79e" />
		// 					<h2>
		// 						Choice of vehicles.
		// 					</h2>
		// 				</div>
		// 			</div>
		// 			<div className="flex text-center justify-center w-100">
		// 				<div className="flex items-center justify-center mt-2 w-1/2">
		// 					<FaCheckCircle size={30} color="#00a79e" />
		// 					<h2>
		// 						Routine maintenance.
		// 					</h2>
		// 				</div>
		// 				<div className="flex items-center justify-center mt-2 text-center w-1/3">
		// 					<FaCheckCircle size={30} color="#00a79e" />
		// 					<h2>
		// 						Oil Change.
		// 					</h2>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<BookingIframe />

		// 	<Divider className="my-4 max-w-2xl" />
		// 	{/* <div className="flex flex-col w-full justify-center mt-5">
		// 		<ContactForm />
		// 	</div> */}

		// 	<div className="mt-5 text-center max-w-5/6 sm:flex">
		// 		<div className="block items-center basis-1/2 gap-2 m-2">
		// 			<Button color="primary" variant="bordered" size="md">
		// 				<Link
		// 					isExternal
		// 					className="flex w-48 text-center align-center justify-center gap-1"
		// 					href={siteConfig.links.whatsapp}
		// 				>
		// 					<FaWhatsapp size={20} />
		// 					<h1 className="text-md">+64221048027</h1>
		// 				</Link>
		// 			</Button>
		// 		</div>
		// 		<div className="block items-center basis-1/2 gap-2 m-2">
		// 			<Button color="primary" variant="bordered" size="md">
		// 				<Link
		// 					isExternal
		// 					className="flex w-48 text-center align-center justify-center gap-1"
		// 					href={siteConfig.links.facebook}
		// 				>
		// 					<FaFacebook size={20} />
		// 					<h1 className="text-md">Osmoz Auckland</h1>
		// 				</Link>
		// 			</Button>
		// 		</div>
		// 		{/* <div className="block items-center basis-1/3 gap-2 m-2">
		// 			<Button color="primary" variant="bordered" size="md">
		// 				<Link
		// 					isExternal
		// 					className="flex w-48 text-center align-center justify-center gap-1"
		// 					href={siteConfig.links.email}
		// 				>
		// 					<FaAt size={20} />
		// 					<h1 className="text-md">holarina1@gmail.com</h1>
		// 				</Link>
		// 			</Button>
		// 		</div> */}
		// 	</div>
		// </section>
	);
}
