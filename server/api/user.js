const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    phone: {
      type: String,
      match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      unique: true,
    },
    avatar: { type: String, default: "default-avatar-url.jpg" },

    telegramId: { type: Number, unique: true },

    balance: { type: Number, default: 0, min: 0 },
    gameHistory: [
      {
        gameId: { type: Schema.Types.ObjectId, ref: "Game" },
        date: { type: Date, default: Date.now },
        result: { type: String, enum: ["win", "lose", "draw"] },
      },
    ],

    inventory: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "Item" },
        count: { type: Number, default: 1 },
      },
    ],

    language: { type: String, default: "ru", enum: ["ru", "en"] },
    lastActive: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// create() - додати користовача
// updateOne() - оновити користовача

const User = mongoose.model("User", userSchema);
module.exports = User;
