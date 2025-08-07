# 🚀 Lovable Backend Setup Guide

## 📋 Prerequisites
- Lovable backend deployed at `https://shop-flow-ctrl.lovable.app`
- Supabase database configured
- Basic knowledge of your backend framework (Node.js/Python/etc.)

## 🔧 Step 1: Add CORS Configuration

### For Node.js/Express Backend:
```javascript
// Install cors package
// npm install cors

const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration - ADD THIS BEFORE YOUR ROUTES
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'file://',
        'https://your-frontend-domain.com' // Add your frontend domain
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Your existing routes go here
app.get('/api/products', (req, res) => {
    // Your products logic
});

app.post('/api/products', (req, res) => {
    // Your create product logic
});

// ... other routes
```

### For Python/Flask Backend:
```python
# Install flask-cors
# pip install flask-cors

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# CORS Configuration - ADD THIS AFTER CREATING THE APP
CORS(app, origins=[
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'file://',
    'https://your-frontend-domain.com'  # Add your frontend domain
])

# Your existing routes go here
@app.route('/api/products', methods=['GET'])
def get_products():
    # Your products logic
    pass

@app.route('/api/products', methods=['POST'])
def create_product():
    # Your create product logic
    pass

# ... other routes
```

### For Python/FastAPI Backend:
```python
# Install fastapi and uvicorn
# pip install fastapi uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Configuration - ADD THIS AFTER CREATING THE APP
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "file://",
        "https://your-frontend-domain.com"  # Add your frontend domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your existing routes go here
@app.get("/api/products")
async def get_products():
    # Your products logic
    pass

@app.post("/api/products")
async def create_product():
    # Your create product logic
    pass

# ... other routes
```

## 🔧 Step 2: Create Required API Endpoints

### Products Endpoints:
```javascript
// GET /api/products - List all products
app.get('/api/products', async (req, res) => {
    try {
        // Query your Supabase database
        const products = await supabase
            .from('products')
            .select('*');
        
        res.json(products.data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/products - Create new product
app.post('/api/products', async (req, res) => {
    try {
        const { title, desc, price, image, details } = req.body;
        
        const newProduct = await supabase
            .from('products')
            .insert([{ title, desc, price, image, details }])
            .select();
        
        res.status(201).json(newProduct.data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, price, image, details } = req.body;
        
        const updatedProduct = await supabase
            .from('products')
            .update({ title, desc, price, image, details })
            .eq('id', id)
            .select();
        
        res.json(updatedProduct.data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await supabase
            .from('products')
            .delete()
            .eq('id', id);
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### Orders Endpoint:
```javascript
// POST /api/orders - Create new order
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, address, paymentMethod, shippingMethod, items, total, status } = req.body;
        
        const newOrder = await supabase
            .from('orders')
            .insert([{ 
                customerName, 
                address, 
                paymentMethod, 
                shippingMethod, 
                items, 
                total, 
                status 
            }])
            .select();
        
        res.status(201).json(newOrder.data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

## 🔧 Step 3: Supabase Database Setup

### Create Products Table:
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    desc TEXT,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    details TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Create Orders Table:
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    shippingMethod VARCHAR(50) NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Step 4: Test Your Backend

### Add a Test Endpoint:
```javascript
// GET /test - Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Backend is working!',
        timestamp: new Date().toISOString(),
        cors: 'enabled'
    });
});
```

### Test with curl:
```bash
# Test basic connectivity
curl https://shop-flow-ctrl.lovable.app/test

# Test products endpoint
curl https://shop-flow-ctrl.lovable.app/api/products

# Test CORS
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://shop-flow-ctrl.lovable.app/api/products
```

## 🔧 Step 5: Deploy and Test

1. **Deploy your changes** to Lovable
2. **Test the endpoints** using the test tool (`test-api.html`)
3. **Check the browser console** for any remaining errors
4. **Verify CORS headers** are present in the response

## 🐛 Common Issues & Solutions

### Issue 1: CORS Still Not Working
**Solution:** Try allowing all origins temporarily:
```javascript
app.use(cors({
    origin: '*', // Allow all origins (for testing)
    credentials: true
}));
```

### Issue 2: Endpoints Return 404
**Solution:** Check your route definitions and make sure they match exactly:
- `/api/products` (not `/products` or `/api/v1/products`)

### Issue 3: Supabase Connection Issues
**Solution:** Verify your Supabase configuration:
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);
```

## ✅ Checklist

- [ ] CORS middleware added to backend
- [ ] All required endpoints created (`/api/products`, `/api/orders`)
- [ ] Supabase tables created
- [ ] Environment variables configured
- [ ] Backend deployed to Lovable
- [ ] Test endpoints working
- [ ] Frontend can connect successfully

---

**Need Help?** Check the `TROUBLESHOOTING.md` file for more detailed debugging steps. 