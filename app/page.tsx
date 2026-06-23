'use client'
import { siteConfig } from "@/config/site";
import HeroSection from "@/components/HeroSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import ContactSection from "@/components/ContactSection";
import ServicesSection from "@/components/ServicesSection";
import { ContactForm } from "@/components/contactform";
import Script from "next/script";

import seoConfig from "@/config/seo";

export default function Home() {
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
				<HeroSection />
				<ServicesSection />
				<ContactForm />
				<WorkShowcaseSection />
				<ContactSection />
			</section>
		</>
	);
}
