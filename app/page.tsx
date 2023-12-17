import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { FaWhatsapp, FaFacebook, FaAt } from "react-icons/fa6";
import Image from "next/image";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="flex">
				<div className="w-2/5">
					<Image src="/home/profile.png" alt="NextUI" width={300} height={400} />
				</div>
				<div className="inline-block max-w-lg text-center justify-center w-3/5">
					<h1 className={title()}>Make&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
					<br />
					<h1 className={title()}>
						websites regardless of your design experience.
					</h1>
					<h2 className={subtitle({ class: "mt-4" })}>
						Beautiful, fast and modern React UI library.
					</h2>
				</div>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
			<div className="mt-5 flex">
				<div className="flex items-center">
					<Link
						isExternal
						className={buttonStyles({ variant: "bordered", radius: "full" })}
						href={siteConfig.links.whatsapp}
					>
						<FaWhatsapp size={30} />
						<h1 className="text-xl">+64221048027</h1>
					</Link>
				</div>
				<div className="flex items-center">
					<Link
						isExternal
						className={buttonStyles({ variant: "bordered", radius: "full" })}
						href={siteConfig.links.facebook}
					>
						<FaFacebook size={30} />
						<h1 className="text-xl">Osmoz Auckland</h1>
					</Link>
				</div>
				<div className="flex items-center">
				<Link
						isExternal
						className={buttonStyles({ variant: "bordered", radius: "full" })}
						href={siteConfig.links.email}
					>
						<FaAt size={30} />
						<h1 className="text-xl">holarina1@gmail.com</h1>
					</Link>
				</div>
			</div>
		</section>
	);
}
