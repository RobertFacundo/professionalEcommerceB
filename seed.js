import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB.js";
import Product from './models/productModel.js';
import products from "./data.js";

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('Data seed successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedProducts();