const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');

const cors = require('cors');

const limiter = rateLimiter({
  windowsMs: 3 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after a minute",
})

const authRoutes = require('./routes/auth.routes.js')
const itemRoutes = require('./routes/item.route.js');
const orderRoutes = require('./routes/order.route.js');
const postRoutes = require('./routes/post.route.js');
const paymentRoutes = require('./routes/payment.route.js');

const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  
];

app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(limiter)

app.use('/api/auth/vibe', authRoutes);
app.use('/api/item/vibe', itemRoutes);
app.use('/api/vibe/order', orderRoutes);
app.use('/api/vibe/post', postRoutes)
app.use('/api/vibe/payment', paymentRoutes);

app.get("/", function(req,res){
    res.send("this is the page")
})


module.exports = app;