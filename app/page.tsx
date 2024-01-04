import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { subtitle } from "@/components/primitives";
import { FaWhatsapp, FaFacebook, FaAt } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { ContactForm } from "@/components/contactform";
import {Divider} from "@nextui-org/react";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-3 md:py-10">
			<div className="flex flex-col w-full">
				<div className="full-w m-auto">
					<Image src="/home/osmoz.png" alt="NextUI" width={200} height={300} />
				</div>
				<div className="flex mt-8 w-full justify-center">
					<div className="hidden sm:flex w-2/5 justify-end">
						<Image src="/home/profile.png" alt="NextUI" width={300} height={400} />
					</div>
					<div className="inline-block max-w-md text-center justify-center w-3/5">
						<div className="flex items-center justify-center mt-2">
							<FaCheckCircle size={30} color="#00a79e" />
							<h2 className={subtitle({})}>
								Oil Change.
							</h2>
						</div>
						<div className="flex items-center justify-center mt-2">
							<FaCheckCircle size={30} color="#00a79e" />
							<h2 className={subtitle({})}>
								General diagnosis.
							</h2>
						</div>
						<div className="flex items-center justify-center mt-2">
							<FaCheckCircle size={30} color="#00a79e" />
							<h2 className={subtitle({})}>
								Choice of vehicles.
							</h2>
						</div>
						<div className="flex items-center justify-center mt-2">
							<FaCheckCircle size={30} color="#00a79e" />
							<h2 className={subtitle({})}>
								Routine maintenance.
							</h2>
						</div>
						<div className="flex items-center justify-center mt-2">
							<FaCheckCircle size={30} color="#00a79e" />
							<h2 className={subtitle({})}>
								Preventive maintenance.
							</h2>
						</div>
					</div>
				</div>
			</div>

			<Divider className="my-4 max-w-2xl"/>
			<div className="flex flex-col w-full justify-center mt-5">
				<ContactForm />
			</div>

			<div className="mt-5 text-center max-w-5/6 sm:flex">
				<div className="block items-center basis-1/2 gap-2 m-2">
					<Button color="primary" variant="bordered" size="md">
						<Link
							isExternal
							className="flex w-48 text-center align-center justify-center gap-1"
							href={siteConfig.links.whatsapp}
						>
							<FaWhatsapp size={20} />
							<h1 className="text-md">+64221048027</h1>
						</Link>
					</Button>
				</div>
				<div className="block items-center basis-1/2 gap-2 m-2">
					<Button color="primary" variant="bordered" size="md">
						<Link
							isExternal
							className="flex w-48 text-center align-center justify-center gap-1"
							href={siteConfig.links.facebook}
						>
							<FaFacebook size={20} />
							<h1 className="text-md">Osmoz Auckland</h1>
						</Link>
					</Button>
				</div>
				{/* <div className="block items-center basis-1/3 gap-2 m-2">
					<Button color="primary" variant="bordered" size="md">
						<Link
							isExternal
							className="flex w-48 text-center align-center justify-center gap-1"
							href={siteConfig.links.email}
						>
							<FaAt size={20} />
							<h1 className="text-md">holarina1@gmail.com</h1>
						</Link>
					</Button>
				</div> */}
			</div>
		</section>
	);
}
