import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia', 
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(500).json({ error: 'An unknown error occurred' });
          }
        }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
