import User from "./db/models.js";

async function saveWallet(userId, walletAddress) {
    let user = await User.findOne({ userId });

    if (user) {
        user.walletAddress = walletAddress;
        await user.save();
    } else {
        await User.create({ userId, walletAddress });
    }

    console.log("✅ Кошелёк сохранён:", walletAddress);
}