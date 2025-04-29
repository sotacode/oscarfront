import { Button } from "@nextui-org/react"
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react"

const ContactSection = () => {
  return (
    <section className="py-16 px-4 text-white bg-gradient-to-br from-[#00a79e] to-[#008080]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-6 h-6 mr-2" />
                <span>(+64) 02 2104 8027</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-6 h-6 mr-2" />
                <span>osmozcarauckland@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                <span>2/886 Dominion Road, Mt Eden, Auckland</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button isIconOnly variant="flat" aria-label="Facebook" as="a" href="https://www.facebook.com/osmozautoauckland" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5" />
              </Button>
              {/* <Button isIconOnly variant="flat" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button isIconOnly variant="flat" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

