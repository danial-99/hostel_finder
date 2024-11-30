'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/actions/payment/stripeCheckout';

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
  const [error, setError] = useState<string | null>(null); // Define setError here

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const secret = await createPaymentIntent(500); 
        setClientSecret(secret);  // Set the client secret once returned
      } catch (err) {
        setError('Failed to fetch payment intent.');
        console.error(err);
      }
    };

    fetchClientSecret();
  }, []);

  if (!clientSecret) {
    return <div>{error ? error : 'Loading...'}</div>;  // Display error or loading message
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
