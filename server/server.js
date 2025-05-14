// server/server.js
const express = require('express');
const path = require('path');
const app = express();

// Разрешаем доступ к папке 'web'
app.use(express.static(path.join(__dirname, '../web')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});