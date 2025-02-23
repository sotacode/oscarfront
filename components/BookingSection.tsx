import { Input, Button, Textarea } from "@nextui-org/react"

const BookingSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h2>
        <form className="space-y-6">
          <Input label="Full Name" placeholder="Enter your full name" variant="bordered" />
          <Input label="Email" placeholder="Enter your email" type="email" variant="bordered" />
          <Input label="Phone" placeholder="Enter your phone number" type="tel" variant="bordered" />
          <Input label="Preferred Date" placeholder="Select your preferred date" type="date" variant="bordered" />
          <Textarea label="Service Details" placeholder="Describe the service you need" variant="bordered" />
          <Button color="primary" size="lg" className="w-full">
            Schedule Appointment
          </Button>
        </form>
      </div>
    </section>
  )
}

export default BookingSection

