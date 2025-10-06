"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import LanguageProvider from "@/context/language/LanguageProvider";
import Script from "next/script";


export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				strategy="afterInteractive"
			/>
			<LanguageProvider>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
				</NextUIProvider>
			</LanguageProvider>
		</>
	);
}
