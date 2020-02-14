process.env["NTBA_FIX_319"] = 1

const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const logger = require('./logger');
const {
    currency_keyboard,
    getFinalHtml,
    prepare_keyboard,
    helpText,
    commandList
} = require('./constants');

//state of current actions
let actions = {}


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const allowedIds = process.env.ALLOWED_TELEGRAM_ID.split(',')
    const adminIds = process.env.ADMIN_TELEGRAM_ID.split(',')

    if(!allowedIds.some(id => id == chatId)) {
        bot.sendMessage(chatId, 'У Вас нет прав доступа на этот бот')
        adminIds.map(id => id != 0 && bot.sendMessage(id, `Попытка использовать бот - ${chatId}`))
        return false
    }

    if(commandList[msg.text]) {
        return false
    }

    if(actions[chatId] && actions[chatId].status === "courseBuy" ){
        controller.getCurrencySailData(actions[chatId].currency, chatId, msg.text)
    }

    else if(actions[chatId] && actions[chatId].status === "courseSail" ){
        controller.prepareToChangeCurrency(chatId, msg.text)
    }

});

bot.onText(/\/change/, (msg) => {
    if(msg.text !== "/change") return false
    const id = msg.chat.id;
    actions[ msg.chat.id] = undefined;
    bot.sendMessage(id, 'Какой курс Вы желаете задать?', {
        reply_markup: {
            inline_keyboard: currency_keyboard,
            remove_keyboard: true,
        }
    })
});

bot.onText(/\/(eur|usd|rub)/, (msg) => {
    const currency = msg.text.replace('/','');
    const id = msg.chat.id;

    actions[ msg.chat.id] = undefined
    controller.getCurrencyData(currency, id)
});

bot.onText(/\/help/, (msg) => {
    const id = msg.chat.id

    bot.sendMessage(id, helpText, {
        parse_mode: 'Markdown'
    })
})

bot.on('callback_query', query => {
    const id = query.message.chat.id
    const data = JSON.parse(query.data)

    if(data.action === 'change_currency') {
        controller.getCurrencyData(data.currency, id)
    }

    if(data.action === 'cancelChangeCurrency') {
        controller.cancelChangeCurrency(id)
    }

    if(data.action === 'acceptChangeCurrency') {
        controller.changeCurrency(id)
    }

});

const controller = {
    getCurrencyData: (currency, id) => {
        actions[id] = { status: 'courseBuy', currency }
        bot.sendMessage(id, `Укажите цену покупки для ${currency.toUpperCase()}`)
    },
    cancelChangeCurrency: (id) => {
        const curryncy = actions[id] && actions[id].currency || ""
        bot.sendMessage(id, `Изменение валюты ${curryncy} отменено`);
        actions[id] = undefined;
    },
    getCurrencySailData: (currency, id, course) => {

        actions[id] = { status: 'courseSail', currency, courseBuy: course }
        bot.sendMessage(id, `Укажите цену продажи для ${currency.toUpperCase()}`)
    },
    changeCurrency : async(id) => {
        if(!actions[id] || !actions[id].currency) return false
        axios.patch(`${process.env.PORT_WITH_URL}/api/currency`, {
            name: actions[id].currency.toUpperCase(),
            "courseBuy": actions[id].courseBuy,
            "courseSail": actions[id].courseSail,
        })
            .then((res) => {
                bot.sendMessage(id, `Курс валюты ${actions[id].currency.toUpperCase()} изменен`);
                actions[id] = undefined;
            })
            .catch((error) => {
                console.log('Проблема с сервером, попробуйте позже', error);
                bot.sendMessage(id, `Проблема с сервером, попробуйте позже`);
            })
    },
    prepareToChangeCurrency: (id, course) => {
        actions[id] = { ...actions[id], courseSail: course }

        bot.sendMessage(id, getFinalHtml(actions[id]), {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: prepare_keyboard,
                remove_keyboard: true,
            }
        })
    }
};

//error handler
bot.on("polling_error", (err) => logger.log('error', err.message));
