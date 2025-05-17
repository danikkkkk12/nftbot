const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone: String,
  comment: String,
  // Добавьте другие поля по необходимости
  createdAt: { type: Date, default: Date.now }
});

const user = mongoose.model('User', userSchema);
module.exports = user;
