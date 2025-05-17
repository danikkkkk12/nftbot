const express = require('express');
const cors = require('cors');
const connectDB = require('../db/db');
const Order = require('./api/order');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../web')); // Для обслуживания статических файлов

// Подключение к БД
connectDB();

// Маршруты
app.post('/models/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/models/order', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

// Автоматическое тестирование (опционально)
if (process.env.NODE_ENV === 'development') {
  require('./test-auto'); 
}
