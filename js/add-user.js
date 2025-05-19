const { Telegraf } = require("telegraf");
const axios = require("axios");
const User = require("../server/api/user");

bot.start(async (ctx) => {
  const { id, username, first_name, last_name } = ctx.from;

  try {
    const existingUser = await User.findOne({ telegramId: id });

    if (!existingUser) {
      const newUser = {
        username: username || undefined, // undefined чтобы не сохранялось, если нет username
        firstName: first_name,
        lastName: last_name || "",
        telegramId: id,
        lastActive: new Date(),
      };

      await User.create(newUser);

      console.log(`Новый пользователь добавлен: ${first_name} (ID: ${id})`);
    } else {
      await User.updateOne(
        { telegramId: id },
        { $set: { lastActive: new Date() } }
      );
      console.log(
        `Пользователь ${first_name} уже существует, обновлено lastActive`
      );
    }

    await ctx.reply(`Привет, ${first_name}! Добро пожаловать!`);
  } catch (error) {
    console.error("Ошибка при работе с пользователем:", error);

    await ctx.reply(
      "Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже."
    );

    if (error.code === 11000) {
      console.error("Ошибка дублирования уникального поля:", error.keyValue);
    }
  }
});
