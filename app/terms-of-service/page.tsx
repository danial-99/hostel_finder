"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Scale, Clock } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Last updated:DECEMBER 21, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Data Protection</h2>
              <p className="text-muted-foreground">
                Your data is protected by industry-standard security measures
              </p>
            </Card>
            <Card className="p-6">
              <Scale className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Fair Usage</h2>
              <p className="text-muted-foreground">
                Guidelines for acceptable use of our platform
              </p>
            </Card>
            <Card className="p-6">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-3">Regular Updates</h2>
              <p className="text-muted-foreground">
                Terms are reviewed and updated to reflect current practices
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using Hostel Finder's services, you agree to be bound by these Terms of Service. 
                    If you disagree with any part of the terms, you may not access the service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                  <p className="text-muted-foreground mb-4">
                    When you create an account with us, you must provide accurate, complete, and current information. 
                    Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You are responsible for safeguarding your account password</li>
                    <li>You agree to not share your account credentials</li>
                    <li>You must notify us immediately of any security breach</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">3. Booking and Payments</h2>
                  <p className="text-muted-foreground mb-4">
                    All bookings made through our platform are subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Prices are displayed in your chosen currency</li>
                    <li>Payment processing is handled securely by our partners</li>
                    <li>Cancellation policies vary by property</li>
                    <li>Refunds are processed according to the hostel's policy</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
                  <p className="text-muted-foreground mb-4">
                    By posting content on Hostel Finder, you grant us the right to use, modify, publicly perform, 
                    publicly display, reproduce, and distribute such content on our platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">5. Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    Your use of Hostel Finder is also governed by our Privacy Policy. Please review our Privacy Policy, 
                    which also governs the site and informs users of our data collection practices.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    Hostel Finder shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                    we will try to provide at least 30 days' notice prior to any new terms taking effect.
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