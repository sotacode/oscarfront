import { Facebook, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

const ContactSection = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpg" alt="Osmoz" width={48} height={48} className="rounded-full" />
              <span className="text-2xl font-bold">Osmoz</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional mobile mechanic service in Auckland. We bring expert car care directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#00a79e] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-[#00a79e] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-400 hover:text-[#00a79e] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/booking" className="text-gray-400 hover:text-[#00a79e] transition-colors">
                  Book Inspection
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#00a79e] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00a79e]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#00a79e]" />
                </div>
                <span className="text-gray-400">(+64) 02 2104 8027</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00a79e]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00a79e]" />
                </div>
                <span className="text-gray-400 break-all">osmozcarauckland@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00a79e]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#00a79e]" />
                </div>
                <span className="text-gray-400">2/886 Dominion Rd, Mt Eden, Auckland</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/osmozautoauckland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#00a79e]/20 rounded-full flex items-center justify-center hover:bg-[#00a79e] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Osmoz Mobile Mechanic. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM
          </p>
        </div>
      </div>
    </footer>
  )
}

export default ContactSection
