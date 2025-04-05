// server.js (Node.js + Express backend)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

app.listen(5000, () => console.log('Server running on port 5000'));

// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});

module.exports = mongoose.model('Product', ProductSchema);

// App.js (React frontend)
import React, { useEffect, useState } from 'react';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h1>E-Commerce Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
