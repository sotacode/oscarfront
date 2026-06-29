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

import { siteConfig } from "@/config/site";
import NextLink from "next/link";

export const Navbar = () => {

	return (
		<NextUINavbar
			maxWidth="xl"
			position="sticky"
			classNames={{
				base: "glass border-b border-white/20 shadow-sm",
				wrapper: "px-4 sm:px-6",
			}}
		>
			<NavbarContent className="basis-1/3" justify="start">
				<NavbarBrand as="li" className="max-w-fit">
					<NextLink className="flex justify-start items-center" href="/">
						<span className="text-xl font-bold gradient-text">
							Osmoz
						</span>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="basis-1/3 hidden sm:flex" justify="center">
				<ul className="flex gap-1 justify-center">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								href={item.href}
								className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#00a79e] transition-colors duration-200 rounded-lg hover:bg-[#00a79e]/5"
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent className="basis-1/3" justify="end">
				<NavbarMenuToggle className="sm:hidden text-gray-700" />
			</NavbarContent>

			<NavbarMenu className="pt-6">
				<div className="mx-4 flex flex-col gap-1">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								href={item.href}
								className="w-full py-3 text-lg font-medium text-gray-700 hover:text-[#00a79e] transition-colors"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
