import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: String,   
    walletAddress: String,
});

const User = mongoose.model("User", userSchema);
export default User;