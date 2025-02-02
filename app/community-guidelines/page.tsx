"use client";

import { Card } from "@/components/ui/card";
import { Check, AlertCircle, Users, Shield } from "lucide-react";

const communityGuidelines = [
  {
    title: "Respect & Inclusivity",
    description: "Treat all members with respect regardless of background, identity, or beliefs.",
    icon: Users,
  },
  {
    title: "Honest Reviews",
    description: "Share authentic experiences and provide constructive feedback.",
    icon: Check,
  },
  {
    title: "Safety First",
    description: "Follow safety protocols and report any concerns immediately.",
    icon: Shield,
  },
];

const prohibitedBehavior = [
  "Discrimination or harassment of any kind",
  "False or misleading reviews",
  "Spam or promotional content",
  "Sharing personal information of others",
  "Creating multiple accounts",
];

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Community Guidelines
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Help us maintain a safe and welcoming community for all travelers
            </p>
          </div>
        </div>
      </section>

      {/* Core Guidelines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityGuidelines.map((guideline, index) => (
              <Card key={index} className="p-6">
                <guideline.icon className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-3">{guideline.title}</h2>
                <p className="text-muted-foreground">{guideline.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Behavior */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Prohibited Behavior</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <div className="space-y-4">
                {prohibitedBehavior.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <AlertCircle className="h-5 w- 5 text-destructive flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Review Guidelines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Review Guidelines</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Writing Helpful Reviews</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <p>Be specific about your experience</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <p>Include both positive and constructive feedback</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <p>Keep it relevant and recent</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <p>Be honest and objective</p>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enforcement */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Guideline Enforcement</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Violations of these guidelines may result in account suspension or termination. 
            We take our community standards seriously to ensure a safe environment for all users.
          </p>
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Report a Violation</h3>
            <p className="text-muted-foreground mb-4">
              If you witness behavior that violates our community guidelines, Fill the form in contact us and report the problem that you are facing,
              please report it immediately. Our team will review and take appropriate action.
            </p>
            
          </Card>
        </div>
      </section>
    </main>
  );
}