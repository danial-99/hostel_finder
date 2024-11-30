'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    // Use Stripe's confirmCardPayment method
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (error) {
      setError(error.message || 'Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      alert('Payment successful!');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/actions/payment/stripeCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5000 }), // The amount in cents (e.g., $50.00)
      });

      if (res.ok) {
        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      } else {
        setError('Failed to fetch payment intent.');
      }
    };

    fetchClientSecret();
  }, []);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default Payment;
