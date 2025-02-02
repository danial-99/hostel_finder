"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, Shield, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Last updated: March 21, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <Card className="p-6">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="text-muted-foreground">
                Your data is encrypted and securely stored
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Privacy Rights</h2>
              <p className="text-muted-foreground">
                Control over your personal information
              </p>
            </Card>
            <Card className="p-6">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Transparency</h2>
              <p className="text-muted-foreground">
                Clear information about data usage
              </p>
            </Card>
            <Card className="p-6">
              <Database className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Data Control</h2>
              <p className="text-muted-foreground">
                Manage your data preferences
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Personal identification information (Name, email address, phone number)</li>
                    <li>Booking information and preferences</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                    <li>Communications with us</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect for various purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>To process your bookings and payments</li>
                    <li>To communicate with you about your reservations</li>
                    <li>To send you marketing communications (with your consent)</li>
                    <li>To improve our services and user experience</li>
                    <li>To protect against fraud and unauthorized access</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                  <p className="text-muted-foreground mb-4">
                    We share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Hostels you book with</li>
                    <li>Payment processors</li>
                    <li>Service providers who assist our operations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">4. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">
                    You have several rights regarding your personal data:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Data portability</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your 
                    personal data against unauthorized or unlawful processing, accidental loss, 
                    destruction, or damage.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
                  <p className="text-muted-foreground">
                    We use cookies and similar tracking technologies to track activity on our platform 
                    and hold certain information. You can instruct your browser to refuse all cookies 
                    or to indicate when a cookie is being sent.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at:
                    privacy@hostelfinder.com
                  </p>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </section>
    </main>
  );
}