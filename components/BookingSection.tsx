import { Input, Button, Textarea } from "@nextui-org/react"
import { BookingIframe } from "./booking"

const BookingSection = ({sectionRef}: any) => {
  return (
    <section className="py-16 px-4 bg-gray-100" ref={sectionRef}>
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center">Book Your Appointment</h2>
        <BookingIframe />
      </div>
    </section>
  )
}

export default BookingSection

