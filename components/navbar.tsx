import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { Button } from "@nextui-org/react";
import Image from "next/image";

export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						{<Image
							src="/logo.jpg"
							alt="Osmoz"
							width={50}
							height={50}
						/>}
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="basis-3/5 hidden sm:flex" justify="center">
				<ul className="hidden sm:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>
			<NavbarContent className="basis-1/5 pl-4" justify="end">
				<NavbarItem className="hidden sm:flex">
					<Button
						as={NextLink}
						href="/booking"
						color="primary"
						variant="shadow"
						size="sm"
						className="font-semibold"
					>
						Book Now
					</Button>
				</NavbarItem>
				<NavbarMenuToggle className="flex sm:hidden" />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === siteConfig.navMenuItems.length - 1
										? "primary"
										: "foreground"
								}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
					<NavbarMenuItem>
						<Button
							as={NextLink}
							href="/booking"
							color="primary"
							variant="shadow"
							className="w-full mt-2 font-semibold"
						>
							Book Now
						</Button>
					</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar >
	);
};
