# ElectroMart E-commerce Frontend

A modern e-commerce frontend built with HTML, CSS, and JavaScript, ready to connect to your Lovable backend.

## 🚀 Quick Setup

### 1. Configure Backend Connection

Edit the `config.js` file and update the following:

```javascript
const CONFIG = {
    // Replace with your actual Lovable backend URL
    API_BASE_URL: 'https://your-backend-url.lovable.app',
    
    // Adjust these endpoints to match your backend API structure
    ENDPOINTS: {
        products: '/api/products',
        orders: '/api/orders',
        auth: '/api/auth',
        users: '/api/users',
        categories: '/api/categories'
    },
    // ... other settings
};
```

### 2. Backend API Requirements

Your backend should provide the following endpoints:

#### Products API
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Product Schema:**
```json
{
  "id": 1,
  "title": "Product Name",
  "desc": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "details": "Detailed product information"
}
```

#### Orders API
- `POST /api/orders` - Create new order

**Order Schema:**
```json
{
  "customerName": "John Doe",
  "address": "123 Main St",
  "paymentMethod": "cash",
  "shippingMethod": "normal",
  "items": [
    {
      "productId": 1,
      "productName": "Product Name",
      "quantity": 2,
      "price": 99.99,
      "total": 199.98
    }
  ],
  "total": 199.98,
  "status": "pending"
}
```

### 3. Authentication (Optional)

If your backend requires authentication:

1. Set `AUTH.required: true` in `config.js`
2. Implement login/logout functionality
3. The frontend will automatically include auth tokens in API requests

### 4. CORS Configuration

Ensure your backend allows requests from your frontend domain:

```javascript
// Example CORS configuration for Node.js/Express
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
    credentials: true
}));
```

## 📁 File Structure

```
ecomm-main/
├── index.html          # Main frontend application
├── config.js           # Backend configuration
└── README.md          # This file
```

## 🔧 Features

- **Product Management**: View, add, edit, delete products
- **Shopping Cart**: Add items, manage quantities
- **Checkout System**: Complete orders with customer details
- **Admin Dashboard**: Manage products through admin panel
- **Responsive Design**: Works on desktop and mobile
- **API Integration**: Connects to your backend for data persistence

## 🛠️ Development

### Local Development

1. Open `index.html` in a web browser
2. The app will work with default products if backend is not connected
3. Configure backend connection in `config.js`

### Testing API Connection

Open browser console and check for:
- Successful API requests
- Error messages for failed connections
- Network tab for request/response details

## 🔒 Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Input Validation**: Validate all user inputs
3. **Authentication**: Implement proper auth if needed
4. **Rate Limiting**: Consider implementing rate limiting on your backend

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **404 Errors**: Verify API endpoints match your backend
3. **Authentication Errors**: Check token format and expiration
4. **Network Errors**: Verify backend URL is correct and accessible

### Debug Mode

Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you need help connecting your frontend to your Lovable backend:

1. Check the Lovable documentation
2. Verify your API endpoints
3. Test with tools like Postman
4. Check browser console for errors
5. Ensure CORS is properly configured

---

**Note**: This frontend is designed to work with any RESTful API backend. Adjust the configuration and API calls as needed for your specific backend implementation. 