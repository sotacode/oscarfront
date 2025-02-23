export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Osmoz",
	description: "Precision and Care for Your Vehicle - Trust Our Mechanic Mastery!",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
	],
	navMenuItems: [
		// {
		// 	label: "Home",
		// 	href: "/",
		// },
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		facebook: "https://www.facebook.com/artesanias.talca.9",
		whatsapp: "https://wa.me/+64221048027",
		email: "mailto:holarina1@gmail.com",
		sponsor: "https://patreon.com/jrgarciadev"
	},
	form: {
		ES: {
			name: "Nombre",
			namePlaceholder: "Escribe tu Nombre",
			errorName: "Nombre es requerido",
			email: "Correo",
			emailPlaceholder: "Escribe tu Correo",
			errorEmail: "Correo es requerido",
			subject: "Asunto",
			subjectPlaceholder: "Escribe tu Asunto",
			errorSubject: "Asunto es requerido",
			description: "Descripción",
			descriptionPlaceholder: "Escriba la razon de su contacto",
			errorDescription: "Descripción es requerido",
			send: "Enviar",
			errorToSend: "Error",
			modalMessage: "Mensaje enviado con éxito",
			modalDescription: "Me contactaré contigo lo antes posible.",
			modalErrorMesage: "Error al enviar mensaje",
			modalErrorDescription: "Por favor, inténtelo de nuevo más tarde o pruebe con otro medio de contacto.",
			buttonCloseModal: "Cerrar"
		},
		EN: {
			name: "Name",
			namePlaceholder: "Type your Name",
			errorName: "Name is required",
			email: "Email",
			emailPlaceholder: "Type your Email",
			errorEmail: "Email is required",
			subject: "Subject",
			subjectPlaceholder: "Type your Subject",
			errorSubject: "Subject is required",
			description: "Description",
			descriptionPlaceholder: "Type the reason for your contact",
			errorDescription: "Description is required",
			send: "Send",
			errorToSend: "Error",
			modalMessage: "Message sent successfully",
			modalDescription: "I will contact you as soon as possible.",
			modalErrorMesage: "Error sending message",
			modalErrorDescription: "Please try again later or try another means of contact.",
			buttonCloseModal: "Close"
		}
	},
};
