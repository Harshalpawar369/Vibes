const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const authRoutes = require('./routes/auth.routes.js')
const itemRoutes = require('./routes/item.route.js');
const orderRoutes = require('./routes/order.route.js');

const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use('/api/auth/vibe', authRoutes);
app.use('/api/item/vibe', itemRoutes);
app.use('/api/vibe/order', orderRoutes);

app.get("/", function(req,res){
    res.send("this is the page")
})


module.exports = app;