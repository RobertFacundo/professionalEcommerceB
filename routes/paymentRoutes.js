import express from 'express';
import { createMercadoPagoPayment, mercadoPagoWebhook } from '../controllers/paymentsController.js';

const router = express.Router();

router.post('/mercadopago', createMercadoPagoPayment);
router.post('/mercadopago/webhook', mercadoPagoWebhook);

export default router;