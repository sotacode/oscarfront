// SEO Metadata Configuration for Osmoz Mobile Mechanic
export const seoConfig = {
    // Business Information
    businessName: "Osmoz Mobile Mechanic",
    businessDescription: "Professional mobile mechanic service in Auckland, New Zealand. Expert car repairs, maintenance, and inspections at your location. Fast, reliable, and affordable auto care.",

    // Contact Information
    phone: "+64221048027",
    email: "holarina1@gmail.com",

    // Location
    serviceArea: "Auckland, New Zealand",
    region: "Auckland",
    country: "New Zealand",

    // Operating Hours
    openingHours: "Mo-Sa 09:00-19:00",

    // Social Media
    facebook: "https://www.facebook.com/artesanias.talca.9",
    whatsapp: "https://wa.me/+64221048027",

    // Website
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://osmoz.co.nz",

    // SEO Keywords
    keywords: [
        "mobile mechanic Auckland",
        "car mechanic Auckland",
        "auto repair Auckland",
        "mobile car service NZ",
        "mechanic near me",
        "car maintenance Auckland",
        "WOF repairs Auckland",
        "pre-purchase inspection Auckland",
        "mobile brake service",
        "emergency mechanic Auckland",
        "affordable car repair Auckland",
        "mobile oil change Auckland",
        "vehicle inspection Auckland",
        "car diagnostics Auckland",
        "mobile auto service"
    ],

    // Services
    services: [
        {
            name: "Pre-Purchase Inspection",
            description: "Comprehensive vehicle inspection before your next car purchase to ensure you're making a smart investment.",
            price: "From $150 NZD"
        },
        {
            name: "WOF Repairs & Certification",
            description: "Partner-assisted WOF services with priority inspection and cost-effective solutions to get your vehicle certified.",
            price: "From $100 NZD"
        },
        {
            name: "Front End Maintenance",
            description: "Specialized service including brakes, shock absorbers, CV joints, steering components, radiator, and more.",
            price: "From $120 NZD"
        },
        {
            name: "Preventive Maintenance",
            description: "Oil and filter changes, cooling system maintenance, brake service and pad replacement to keep your car running smoothly.",
            price: "From $80 NZD"
        }
    ],

    // Open Graph Images
    ogImage: "/og-image.png", // You should create this image (1200x630px)
    logo: "/logotransparent.png",

    // Structured Data
    priceRange: "$$",
    acceptsReservations: true,

    // Additional SEO
    author: "Osmoz Mobile Mechanic",
    locale: "en_NZ",
    type: "website",
};

export default seoConfig;
