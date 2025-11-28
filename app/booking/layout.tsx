import { Metadata } from "next";
import seoConfig from "@/config/seo";

export const metadata: Metadata = {
    title: "Book Appointment",
    description: `Book your mobile mechanic appointment online with ${seoConfig.businessName}. Fast, convenient online booking for car repairs, maintenance, and inspections in Auckland.`,
    openGraph: {
        title: `Book Appointment | ${seoConfig.businessName}`,
        description: `Book your mobile mechanic appointment online. Fast, convenient service in Auckland.`,
        url: `${seoConfig.siteUrl}/booking`,
    },
};

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
