import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.json('Backend running')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

