import express from 'express';
import { createMercadoPagoPayment, mercadoPagoWebhook } from '../controllers/mercadoPagoController.js';
import { createStripePaymentIntent, stripeWebHook } from '../controllers/stripeController.js';

const router = express.Router();

router.post('/mercadopago', createMercadoPagoPayment);
router.post('/mercadopago/webhook', mercadoPagoWebhook);

router.post('/stripe/create-payment-intent', createStripePaymentIntent);
router.post('/stripe/webhook', stripeWebHook)

export default router;