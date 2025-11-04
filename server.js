import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post(
    '/api/payments/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }),
    paymentRoutes // pasa al router
);

app.use('/api/payments', express.json(), paymentRoutes);

app.get('/', (req, res) => {
    res.json('Backend running')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

