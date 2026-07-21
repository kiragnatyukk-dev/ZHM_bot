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

    const keyboard = new InlineKeyboard().url('📅 Записаться в DIKIDI', dikidiLink);

    await ctx.editMessageText(
      `Отлично! Услуга: ${value}\n\nНажмите кнопку ниже, чтобы завершить запись:`,
      { reply_markup: keyboard }
    );
  }

  await ctx.answerCallbackQuery();
});

bot.start();
console.log('Бот запущен');
