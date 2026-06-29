export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Osmoz",
	description: "Precision and Care for Your Vehicle - Trust Our Mechanic Mastery!",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About Us",
			href: "/about",
		},
		{
			label: "Gallery",
			href: "/gallery",
		},
		{
			label: "Contact",
			href: "/#contact",
		},
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About Us",
			href: "/about",
		},
		{
			label: "Gallery",
			href: "/gallery",
		},
		{
			label: "Contact",
			href: "/#contact",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		facebook: "https://www.facebook.com/osmozautoauckland",
		whatsapp: "https://wa.me/+64221048027",
		email: "mailto:osmozcarauckland@gmail.com",
		sponsor: "https://patreon.com/jrgarciadev"
	},
	form: {
		ES: {
			name: "Nombre",
			namePlaceholder: "Escribe tu Nombre",
			errorName: "Nombre es requerido",
			phone: "Teléfono",
			phonePlaceholder: "Escribe tu Teléfono",
			errorPhone: "Teléfono es requerido",
			email: "Correo",
			emailPlaceholder: "Escribe tu Correo",
			errorEmail: "Correo es requerido",
			rego: "Matrícula",
			regoPlaceholder: "Escribe la matrícula del vehículo",
			errorRego: "Matrícula es requerida",
			serviceRequired: "Servicio Requerido",
			errorServiceRequired: "Seleccione un servicio",
			message: "Mensaje",
			messagePlaceholder: "Describe el servicio que necesitas",
			errorMessage: "Mensaje es requerido",
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
			phone: "Phone",
			phonePlaceholder: "Type your Phone",
			errorPhone: "Phone is required",
			email: "Email",
			emailPlaceholder: "Type your Email",
			errorEmail: "Email is required",
		rego: "Rego",
			regoPlaceholder: "Vehicle registration number",
			errorRego: "Rego is required",
			serviceRequired: "Service Required",
			errorServiceRequired: "Please select a service",
			message: "Message",
			messagePlaceholder: "Describe the service you need",
			errorMessage: "Message is required",
			send: "Submit",
			errorToSend: "Error",
			modalMessage: "Message sent successfully",
			modalDescription: "We will contact you as soon as possible.",
			modalErrorMesage: "Error sending message",
			modalErrorDescription: "Please try again later or try another means of contact.",
			buttonCloseModal: "Close"
		}
	},
};
