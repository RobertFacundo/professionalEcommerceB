# 🛒 Professional E-commerce Backend

Backend for a professional e-commerce application built with **Node.js**, **Express**, and **MongoDB**. It provides API endpoints to manage products, orders, and payments through **Stripe** and **MercadoPago**.

---

## 🚀 Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Stripe API
- MercadoPago API
- Multer (for file uploads)
- Cors
- dotenv
- body-parser

---

## 📦 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create a new product (with image upload) |
| PUT | `/api/products/:id` | Update a product (with image upload) |
| DELETE | `/api/products/:id` | Delete a product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id` | Update an order |
| DELETE | `/api/orders/:id` | Delete an order |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/stripe/create-payment-intent` | Create a Stripe payment intent |
| POST | `/api/payments/stripe/webhook` | Stripe webhook for payment events |
| POST | `/api/payments/mercadopago` | Create a MercadoPago payment |
| POST | `/api/payments/mercadopago/webhook` | MercadoPago webhook |

---

## 💡 Key Features
- Full CRUD for products and orders.
- Image upload support for products using **Multer**.
- Integration with **Stripe** and **MercadoPago** for payment processing.
- Webhook endpoints to handle payment confirmations.
- CORS enabled and environment variables managed with **dotenv**.

---

- ## 📬 Contact

- LinkedIn: [Facundo Robert](https://www.linkedin.com/in/robertfacundodev/)
- Portfolio: [My Portfolio](https://facundorobert.vercel.app/) 
- Email: robertf.coder@gmail.com

---
