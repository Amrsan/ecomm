# 🔧 Troubleshooting: "Failed to fetch" Error

## 🚨 Problem: "Supabase connection test failed: Failed to fetch"

This error typically indicates one of these issues:

### 1. **CORS (Cross-Origin Resource Sharing) Issue** ⭐ Most Common
**Symptoms:** Network error in browser console, "Failed to fetch" error

**Solution:** Configure CORS in your Lovable backend

#### For Node.js/Express backend:
```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500', 
        'file://',
        'http://localhost:5500',
        'https://your-frontend-domain.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
```

#### For Python/Flask backend:
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:5500', 'file://'])
```

### 2. **Backend Not Running**
**Symptoms:** Connection timeout, "Failed to fetch"

**Solution:** 
- Check if your Lovable backend is deployed and running
- Verify the URL: `https://shop-flow-ctrl.lovable.app`
- Try accessing the URL directly in browser

### 3. **Wrong API Endpoints**
**Symptoms:** 404 errors, "Failed to fetch"

**Solution:** Check your backend API structure. Common variations:
- `/api/products` (current)
- `/products`
- `/api/v1/products`
- `/rest/v1/products` (Supabase REST API)

### 4. **Supabase Configuration Issues**
**Symptoms:** Auth errors, database connection issues

**Solution:** 
- Verify Supabase project is active
- Check API keys and configuration
- Ensure database tables exist

## 🔍 Step-by-Step Debugging

### Step 1: Use the Test Tool
1. Open `test-api.html` in your browser
2. Click "Test Basic Connection"
3. Check the detailed error messages

### Step 2: Check Backend Status
1. Click "Check Backend Status" in the test tool
2. Verify your Lovable backend is running

### Step 3: Test Different Endpoints
1. Click "Test Different Endpoints"
2. Find which endpoint structure your backend uses

### Step 4: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try making a request
4. Look for CORS errors or 404s

## 🛠️ Quick Fixes

### Fix 1: Update CORS Configuration
In your Lovable backend, add this CORS configuration:

```javascript
// Node.js/Express
app.use(cors({
    origin: '*', // Allow all origins (for testing)
    credentials: true
}));
```

### Fix 2: Check API Endpoints
Verify your backend has these endpoints:
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`

### Fix 3: Test with Postman
1. Open Postman
2. Try `GET https://shop-flow-ctrl.lovable.app/api/products`
3. If it works in Postman but not browser = CORS issue
4. If it doesn't work in Postman = Backend issue

## 📋 Checklist

- [ ] Backend is deployed and running
- [ ] CORS is configured correctly
- [ ] API endpoints exist and work
- [ ] Supabase connection is active
- [ ] Database tables are created
- [ ] No firewall/network issues

## 🆘 Still Having Issues?

1. **Check Lovable Dashboard:**
   - Verify your backend is deployed
   - Check deployment logs for errors
   - Ensure environment variables are set

2. **Test with Simple Endpoint:**
   ```javascript
   // Add this to your backend for testing
   app.get('/test', (req, res) => {
       res.json({ message: 'Backend is working!' });
   });
   ```

3. **Contact Support:**
   - Lovable support for backend issues
   - Supabase support for database issues

## 🔄 Alternative Solutions

### Option 1: Use Proxy
If CORS is the issue, you can use a proxy:

```javascript
// Update config.js
const CONFIG = {
    API_BASE_URL: 'https://cors-anywhere.herokuapp.com/https://shop-flow-ctrl.lovable.app',
    // ... rest of config
};
```

### Option 2: Local Development
For local development, you can disable CORS in your browser (Chrome):
```bash
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```

### Option 3: Use Different Backend
Consider using a different backend service like:
- Vercel
- Netlify Functions
- AWS Lambda
- Firebase Functions

---

**Remember:** The most common cause is CORS configuration. Start there! 