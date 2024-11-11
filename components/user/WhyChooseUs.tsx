import { CreditCard, Search, HeadphonesIcon, Users } from 'lucide-react'

const features = [
  {
    icon: CreditCard,
    title: 'Payment methods',
    description: 'We have a lot of payment methods that you can choose from to pay for your reservation.',
  },
  {
    icon: Search,
    title: 'Simple search process',
    description: 'With our powerful search, you can find all the accommodations that match your needs.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer service team is available 24/7 to assist you with any questions or concerns.',
  },
  {
    icon: Users,
    title: 'We are nice',
    description: 'Our team is committed to providing you with the best possible experience.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <p className='text-center w-6/12 mx-auto text-lg'>{`The main reason is because our competitors have disgusting sites, but we can' t write that here, so the text here will be different`}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}