// SEO Metadata Configuration for Osmoz Mobile Mechanic
export const seoConfig = {
    // Business Information
    businessName: "Osmoz Mobile Mechanic",
    businessDescription: "Professional mobile mechanic service in Auckland, New Zealand. Expert car repairs, maintenance, and inspections at your location. Fast, reliable, and affordable auto care.",

    // Contact Information
    phone: "+64221048027",
    email: "osmozcarauckland@gmail.com",

    // Location
    serviceArea: "Auckland, New Zealand",
    region: "Auckland",
    country: "New Zealand",

    // Operating Hours
    openingHours: "Mo-Sa 09:00-19:00",

    // Social Media
    facebook: "https://www.facebook.com/osmozautoauckland",
    whatsapp: "https://wa.me/+64221048027",

    // Website
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://osmozauto.co.nz",

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
        "mobile auto service",
        "fleet servicing Auckland",
        "suspension repairs Auckland",
        "brake repairs Auckland",
        "computer diagnostics Auckland"
    ],

    // Services
    services: [
        {
            name: "Pre-Purchase Inspections",
            description: "Thorough mechanical and structural evaluation of a used vehicle to identify safety, compliance and hidden issues to ensure you can make a decision with all necessary insights.",
            price: "From $150 NZD"
        },
        {
            name: "Vehicle Servicing",
            description: "Professional servicing for all makes and models. Regular servicing improves your vehicle's efficiency and reliability and will prolong its lifespan.",
            price: "From $80 NZD"
        },
        {
            name: "Fleet Servicing",
            description: "Dependable fleet maintenance to reduce downtime, manage expenses, ensure compliance, and keep your business vehicles safe and operational every day.",
            price: "Contact for quote"
        },
        {
            name: "Brake Repairs",
            description: "Complete inspections and repairs to preserve the lifespan of your rotors and keep your vehicle performing smoothly on the road and maintaining optimal stopping distances.",
            price: "From $120 NZD"
        },
        {
            name: "Suspension Repairs",
            description: "Suspension repairs and diagnostics, keeping your vehicle safe, controllable, and smooth on the road and protecting your tires and other parts from costly wear and tear.",
            price: "From $120 NZD"
        },
        {
            name: "WOF Repairs",
            description: "Repairs to ensure your vehicle meets strict safety standards. We have a business partner to ensure a timely and stress-free Warrant of Fitness inspection.",
            price: "From $100 NZD"
        },
        {
            name: "Computer Diagnostics",
            description: "Advanced diagnostics to enable early problem detection, prevent costly breakdowns, and drastically speed up repair times.",
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
