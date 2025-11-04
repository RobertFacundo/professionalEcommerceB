import mongoose from "mongoose";

const orderProductSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
}, { _id: false });

const addressSchema = mongoose.Schema({
    street: { type: String },
    betweenStreets: { type: String },
    department: { type: String },
    city: { type: String },
    province: { type: String },
    zip: { type: String },
    phone: { type: String }
}, { _id: false });

const orderSchema = mongoose.Schema({
    products: [orderProductSchema],
    buyer: {
        name: { type: String, required: true },
        email: { type: String },
        address: addressSchema
    },
    shippingMethod: { type: String },
    payment: {
        method: { type: String },
        paymentId: { type: String },
        status: { type: String, default: 'pending' }
    },
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;