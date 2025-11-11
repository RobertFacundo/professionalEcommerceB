import Order from "../models/orderModels.js";
import stripe from "../config/stripe.js";
import { Preference, client as mpClient } from '../config/mercadoPago.js'

export const createOrder = async (req, res) => {
    try {
        const {
            products,
            buyer,
            shippingMethod,
            paymentMethod,
            total
        } = req.body;

        if (!products || !products.length) {
            return res.status(400).json({ message: 'Empty cart' });
        }

        if (!buyer || !buyer.name) {
            return res.status(400).json({ message: 'buyer data imcompleted' });
        }

        const order = new Order({
            products,
            buyer,
            shippingMethod,
            payment: {
                method: paymentMethod,
                status: 'pending'
            },
            total,
            status: 'pending'
        });

        const createOrder = await order.save();

        if (paymentMethod === 'mercadopago') {
            const preference = new Preference(mpClient);
            const items = products.map(p => ({
                title: p.name || 'Product',
                quantity: Number(p.quantity),
                unit_price: Number(p.price),
                currency_id: 'ARS'
            }));

            const body = {
                items,
                payer: {
                    name: buyer.name,
                    email: buyer.email
                },
                external_reference: String(createOrder._id),
                back_urls: {
                    success: "https://localhost:5173/success",
                    failure: "https://localhost:5173/failure",
                    pending: "https://localhost:5173/pending"
                },
                auto_return: "approved"
            };

            const prefResponse = await preference.create({ body });
            console.log("💡 Mercado Pago preference response:", prefResponse);

            createOrder.payment.paymentId = prefResponse.id;
            await createOrder.save();

            console.log("✅ Order saved and payment pref attached. orderId:", createOrder._id);

            return res.status(201).json({
                orderId: createOrder._id,
                payment: {
                    provider: 'mercadopago',
                    preferenceId: prefResponse.id,
                    init_point: prefResponse.init_point
                }
            });
        } else if (paymentMethod === 'stripe') {
            const amount = Math.round(total * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: process.env.STRIPE_CURRENCY || 'ars',
                automatic_payment_methods: { enabled: true },
                metadata: {
                    orderId: String(createOrder._id)
                }
            });

            createOrder.payment.paymentId = paymentIntent.id;
            await createOrder.save();

            return res.status(201).json({
                order: {
                    _id: createOrder._id,
                    products: createOrder.products,
                    buyer: createOrder.buyer,
                    shippingMethod: createOrder.shippingMethod,
                    total: createOrder.total,
                    status: createOrder.status,
                    payment: {
                        method: createOrder.payment.method,
                        status: createOrder.payment.status,
                        paymentId: createOrder.payment.paymentId
                    }
                },
                payment: {
                    provider: 'stripe',
                    clientSecret: paymentIntent.client_secret,
                    paymentIntentId: paymentIntent.id
                }
            });
        } else if (paymentMethod === 'transferencia') {
            return res.status(201).json({
                orderId: createOrder._id,
                payment: {
                    provider: 'transferencia',
                    instructions: 'Make a transfer to the account number xxxx and the order id'
                }
            });

        } else if (paymentMethod === 'whatsapp') {
            return res.status(201).json({
                orderId: createOrder._id,
                payment: {
                    provider: 'whatsapp',
                    instructions: 'This order would normally be sent via WhatsApp. Simulation mode active.'
                },
                messagePreview: {
                    products,
                    total,
                    buyer,
                    shippingMethod
                }
            });
        } else {
            return res.status(400).json({ message: 'Payment method not supported' })
        }
    } catch (error) {
        console.error('createOrder error', error);
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.productId', 'name category image');
        if (order) return res.json(order);
        res.status(404).json({ message: 'order not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });


        const { status, paymentStatus } = req.body;
        if (status) order.status = status;
        if (paymentStatus) order.payment.status = paymentStatus

        const updated = await order.save();

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (deleted) return res.json({ message: 'Order deleted' });

        res.status(404).json({ message: 'Order not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};