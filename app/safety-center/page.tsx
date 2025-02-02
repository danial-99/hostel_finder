"use client";

import { Card } from "@/components/ui/card";
import { Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";

const safetyFeatures = [
  {
    title: "Verified Hostels",
    description: "All hostels undergo thorough verification and regular quality checks",
    icon: CheckCircle,
  },
 
  {
    title: "Secure Payments",
    description: "Enhanced payment security with encryption and fraud protection",
    icon: Shield,
  },
];

const safetyTips = [
  {
    title: "Keep Valuables Secure",
    description: "Use lockers provided by hostels and keep important documents safe.",
  },
  {
    title: "Share Your Itinerary",
    description: "Let friends or family know about your travel plans and accommodation.",
  },
  {
    title: "Trust Your Instincts",
    description: "If something doesn't feel right, don't hesitate to contact our support team.",
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Learn about our commitment to keeping travelers safe and secure
            </p>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-3">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Safety Guidelines</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {safetyTips.map((tip, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg mb-6">
              In case of emergency, please contact:
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-primary">+923175160306</p>
              </div>
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-primary">hostelfinder.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}