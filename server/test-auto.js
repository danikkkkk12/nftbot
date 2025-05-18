const axios = require("axios");

const sendRequest = async () => {
  try {
    const testData = {
      username: "gamer123",
      firstName: "Олександр",
      lastName: "Білик",
      phone: "+380931234567",
      avatar: "https://example.com/avatars/avatar1.jpg",
      telegramId: 123456789,
      balance: 150,
      gameHistory: [
        {
          gameId: "60f5c2c4b5f1e12b34567890",
          date: new Date("2025-05-15T14:30:00Z"),
          result: "win",
        },
        {
          gameId: "60f5c2c4b5f1e12b34567891",
          date: new Date("2025-05-16T10:00:00Z"),
          result: "lose",
        },
      ],
      inventory: [
        {
          itemId: "60f5c2c4b5f1e12b34567999",
          count: 3,
        },
        {
          itemId: "60f5c2c4b5f1e12b34567000",
          count: 1,
        },
      ],
      language: "ru",
      lastActive: new Date(),
      isAdmin: true,
    };

    const response = await axios.post(
      "http://localhost:3000/api/users",
      testData
    );
    console.log(
      `✅ [${new Date().toISOString()}] Запрос успешен:`,
      response.data._id
    );

    // Получаем список всех заказов
    const user = await axios.get("http://localhost:3000/api/users");
    console.log(`📦 Всего заказов: ${user.data.length}`);
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
  }
};
sendRequest();
console.log("Авто-тестирование запущено (интервал 5 сек)");
