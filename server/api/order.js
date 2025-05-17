const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: String,
  phone: String,
  comment: String,
  // Добавьте другие поля по необходимости
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
