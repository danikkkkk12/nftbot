// const axios = require('axios');

// const sendRequest = async () => {
//   try {
//     const testData = {
//       name: `Auto-${Math.floor(Math.random() * 1000)}`,
//       phone: `+79${Math.floor(10000000 + Math.random() * 90000000)}`,
//       comment: `Авто-запрос в ${new Date().toLocaleTimeString()}`
//     };

//     const response = await axios.post('http://localhost:3000/api/order', testData);
//     console.log(`✅ [${new Date().toISOString()}] Запрос успешен:`, response.data._id);
    
//     // Получаем список всех заказов
//     const orders = await axios.get('http://localhost:3000/api/order');
//     console.log(`📦 Всего заказов: ${orders.data.length}`);
//   } catch (error) {
//     console.error('❌ Ошибка:', error.message);
//   }
// };

// // Запускаем каждые 5 секунд бесконечно
// setInterval(sendRequest, 5000);

// console.log('Авто-тестирование запущено (интервал 5 сек)');