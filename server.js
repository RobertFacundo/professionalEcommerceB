import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import bodyParser from 'body-parser';
import connectDB from './config/connectDB.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.static('public'));

app.post(
    '/api/payments/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }),
    paymentRoutes
);

app.use(express.json());

app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.json('Backend running')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

