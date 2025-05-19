const axios = require("axios");

const sendRequest = async () => {
  try {
    const testData = {
      username: `gamer${Math.floor(Math.random() * 10000)}`,
      firstName: "Олександр",
      lastName: "Білик",
      phone: `+38093${Math.floor(1000000 + Math.random() * 9000000)}`,
      avatar: "https://example.com/avatars/avatar1.jpg",
      telegramId: Math.floor(100000000 + Math.random() * 900000000),
      balance: 150,
      gameHistory: [
        {
          gameId: "60f5c2c4b5f1e12b34567890",
          date: "2025-05-15T14:30:00Z",
          result: "win",
        },
        {
          gameId: "60f5c2c4b5f1e12b34567891",
          date: "2025-05-16T10:00:00Z",
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
      lastActive: new Date().toISOString(),
      isAdmin: true,
    };

    const response = await axios.post("http://localhost:3000/api/users", testData);
    console.log(`✅ [${new Date().toISOString()}] Запрос успешен:`, response.data?._id);

    // Получаем список всех пользователей (исправлено: более точное название переменной)
    const usersResponse = await axios.get("http://localhost:3000/api/users");
    console.log(`📦 Всего пользователей: ${usersResponse.data.length}`);
  } catch (error) {
    console.error("❌ Ошибка:", error.response?.data || error.message);
  }
};

sendRequest();
console.log("Авто-тестирование запущено (интервал 5 сек)");
