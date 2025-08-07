// Corrected Backend Configuration for Supabase

// IMPORTANT: You need your Supabase Anonymous Key.
// Find it in your Supabase Dashboard: Project Settings > API > Project API keys
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3YXhvc3lxZ2t1Y25vd3NheWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTc1ODIsImV4cCI6MjA2OTI5MzU4Mn0.y7s5f8KCFbM0jIBD-zGyaj39zi3PaEE3Yiqkn6DYj14';

const CONFIG = {
    // This is correct
    API_BASE_URL: 'https://dwaxosyqgkucnowsayeu.supabase.co',

    // API Endpoints - Corrected for Supabase REST API v1
    ENDPOINTS: {
        // The path is /rest/v1/{table_name}
        products: '/rest/v1/products',
        orders: '/rest/v1/orders',     // Assuming you have an 'orders' table
        users: '/rest/v1/users',         // Assuming you have a 'users' table
        categories: '/rest/v1/categories', // Assuming you have a 'categories' table
        
        // Supabase Auth has a different path, this is just a placeholder
        auth: '/auth/v1' 
    },

    // Authentication settings - Updated for Supabase
    AUTH: {
        // Supabase always requires an API key
        required: true, 
        // We will use the Supabase Anon Key
        apiKey: SUPABASE_ANON_KEY,
        // The key is passed as a Bearer token in the Authorization header
        tokenType: 'Bearer' 
    },

    // API Request settings (these are fine)
    API: {
        timeout: 10000, // 10 seconds
        retryAttempts: 3,
        retryDelay: 1000 // 1 second
    },

    // Debug settings (these are fine)
    DEBUG: {
        enabled: true,
        logRequests: true,
        logResponses: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
