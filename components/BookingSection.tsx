import { Input, Button, Textarea } from "@nextui-org/react"
import { BookingIframe } from "./booking"

const BookingSection = ({sectionRef}: any) => {
  return (
    <section className="pt-16 px-4 bg-gray-100" ref={sectionRef}>
      <div className="mx-auto pt-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center">Book Your Appointment</h2>
        <BookingIframe />
      </div>
    </section>
  )
}

export default BookingSection

