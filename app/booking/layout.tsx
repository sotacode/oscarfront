import { Metadata } from "next";
import seoConfig from "@/config/seo";

export const metadata: Metadata = {
    title: "Book Pre-Purchase Inspection",
    description: `Book your pre-purchase vehicle inspection online with ${seoConfig.businessName}. Thorough mechanical and structural evaluation to help you make an informed decision.`,
    openGraph: {
        title: `Book Pre-Purchase Inspection | ${seoConfig.businessName}`,
        description: `Book your pre-purchase vehicle inspection online. Thorough evaluation in Auckland.`,
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
