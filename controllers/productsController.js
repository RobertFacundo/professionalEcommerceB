import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, category, prices, stock, minQuantity, description, comments } = req.body;

        const image = req.file ? `/images/products/${req.file.filename}` : '';

        const product = new Product({
            name,
            category,
            image,
            prices,
            stock,
            minQuantity,
            description,
            comments,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Actualizar campos solo si vienen en req.body
        // if (req.body.name) product.name = req.body.name;
        if (req.body.category) product.category = req.body.category;
        // if (req.body.prices) product.prices = JSON.parse(req.body.prices); // si envías array como string
        // if (req.body.stock !== undefined) product.stock = req.body.stock;
        // if (req.body.minQuantity !== undefined) product.minQuantity = req.body.minQuantity;
        // if (req.body.description) product.description = req.body.description;
        // if (req.body.comments) product.comments = req.body.comments;

        // Si hay archivo subido
        if (req.file) {
            product.image = `/images/products/${req.file.filename}`;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (deletedProduct) {
            res.json({ message: 'Deleted Product' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}