require('dotenv').config();
const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot(process.env.BOT_TOKEN);

const services = ['Мужская стрижка', 'Оформление бороды и усов', 'Детская стрижка (до 12 лет)', 'Фейд'];

const dikidiLink = 'https://dikidi.ru/1896105';

const userState = {};

bot.command('start', (ctx) => {
  const chatId = ctx.chat.id;
  userState[chatId] = {};

  const keyboard = new InlineKeyboard();
  services.forEach(s => keyboard.text(s, `service:${s}`).row());

  ctx.reply('Привет! Выберите услугу:', { reply_markup: keyboard });
});

bot.on('callback_query:data', async (ctx) => {
  const chatId = ctx.chat.id;
  const [type, value] = ctx.callbackQuery.data.split(':');
  const state = userState[chatId] || {};

  if (type === 'service') {
    state.service = value;
    userState[chatId] = state;

<<<<<<< HEAD
    const keyboard = new InlineKeyboard().webApp('📅 Записаться в DIKIDI', 'https://kiragnatyukk-dev.github.io/desktop-webapp-zhm/');
=======
    const keyboard = new InlineKeyboard().webApp('📅 Записаться в DIKIDI','https://kiragnatyukk-dev.github.io/desktop-webapp-zhm/');

>>>>>>> 5b66e840060dcf4a7c482438e17d21936e9174aa

    await ctx.editMessageText(
      `Отлично! Услуга: ${value}\n\nНажмите кнопку ниже, чтобы завершить запись:`,
      { reply_markup: keyboard }
    );
  }

  await ctx.answerCallbackQuery();
});

bot.start();

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Веб-сервер слушает порт ${PORT}`));

console.log('Бот запущен');
