import { Card, CardBody } from "@nextui-org/react"
import { Wrench, Clock, ThumbsUp } from "lucide-react"

const IntroductionSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wrench className="w-8 h-8 text-blue-500" />}
            title="Expert Technicians"
            description="Our certified mechanics have years of experience in all types of vehicle repair."
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-blue-500" />}
            title="Quick Turnaround"
            description="We understand the importance of your time and strive to get you back on the road quickly."
          />
          <FeatureCard
            icon={<ThumbsUp className="w-8 h-8 text-blue-500" />}
            title="Quality Service"
            description="We use only high-quality parts and stand behind our work with a satisfaction guarantee."
          />
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <Card>
    <CardBody className="text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardBody>
  </Card>
)

export default IntroductionSection

