import stripe from "../config/stripe.js";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

export const createStripePaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        console.log('💡 Create PaymentIntent:', { amount, currency });

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true }
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message })
    }
};

export const stripeWebHook = async (req, res) => {
    let event;
    try {
        const sig = req.headers['stripe-signature'];

        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error('⚠️ Webhook signature verification failed:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('💰 Successfull payment', paymentIntent.id);

            break;
        case 'payment_intent.payment_failed':
            console.log('❌ Failed Payment:', event.data.object.id);

            break;
        default:
            console.log(`Not handled event: ${event.type}`)
    }

    res.sendStatus(200);
}