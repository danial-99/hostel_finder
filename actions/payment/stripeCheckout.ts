import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia' as '2024-12-18.acacia',
});


export const createPaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', 
    });

    return paymentIntent.client_secret; 
  } catch (err) {
    console.error('Error creating payment intent:', err);
    throw new Error('Error creating payment intent');
  }
};
