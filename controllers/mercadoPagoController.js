import { client, Preference } from "../config/mercadoPago.js";

export const createMercadoPagoPayment = async (req, res) => {
    try {
        const { items, payer } = req.body;

        console.log("💡 req.body:", req.body);

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items,
                payer,
                back_urls: {
                    success: "https://professional-mern-eccomerce-f.vercel.app/success",
                    failure: "https://professional-mern-eccomerce-f.vercel.app/failure",
                    pending: "https://professional-mern-eccomerce-f.vercel.app/pending"
                },
                auto_return: "approved"
            }
        });

        console.log("💡 preference response:", response);

        res.status(200).json({
            id: response.id,
            init_point: response.init_point
        });
    } catch (error) {
        console.error('Error creating MP payment:', error);
        res.status(500).json({ error: error.message });
    }
};

export const mercadoPagoWebhook = async (req, res) => {
    try {
        const payment = req.body;

        console.log("🔔 Webhook recibido de Mercado Pago:", payment);

        if (payment.type === "payment" || payment.action === 'payment.created') {
            const paymentId = payment.data?.id || (payment?.data?.id);
            console.log("Payment ID:", paymentId);

            // Opcional: consultar el estado usando el endpoint oficial
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });
            const paymentInfo = await response.json();
            console.log("💳 Payment info (from MP API):", paymentInfo?.status, paymentInfo);

            const externalRef = paymentInfo.external_reference;
            if (externalRef) {
                const newPaymentStatus = paymentInfo.status;
                const newOrderStatus = newPaymentStatus === 'approved' ? 'paid' : 'pending';

                const updated = await Order.findByIdAndUpdate(externalRef, {
                    'payment.paymentId': paymentId,
                    'payment.status': newPaymentStatus,
                    status: newOrderStatus
                }, { new: true })
                console.log("✅ Order updated from webhook:", updated?._id, updated?.status)
            } else {
                console.warn("⚠️ No external_reference found in paymentInfo:", paymentInfo);
            }


            return res.status(200).json({ message: "Webhook processed correctly" });
        } else {
            console.log("ℹ️ Webhook event type not handled:", event.type);
            return res.status(400).json({ message: 'not handled event' });
        }
    } catch (error) {
        console.error("❌ Error en webhook Mercado Pago:", error);
        res.status(500).json({ error: error.message })
    }
}