import mongoose from "mongoose";

const priceSchema = mongoose.Schema(
    {
        presentation: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String },
        prices: [priceSchema],
        stock: { type: Number, default: 0 },
        minQuantity: { type: Number, default: 1 },
        description: { type: String },
        comments: { type: String },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;