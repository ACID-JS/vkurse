process.env["NTBA_FIX_319"] = 1

const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')
const bot = new TelegramBot(token, {polling: true});

const token = '936631566:AAGmkZ3yvBa749X2UeLHbF3OronIn6ZysWY';
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

    if(commandList[msg.text]) {
        return false
    }

    if(actions[chatId] && actions[chatId].status === "courseBuy" ){
        if(Number(msg.text) && Number(msg.text).toFixed(2) > 0) {
            controller.getCurrencySailData(actions[chatId].currency, chatId, msg.text)
        } else {
            controller.getCurrencyData(actions[chatId].currency, chatId)
        }
    }

    else if(Number(msg.text) && Number(msg.text).toFixed(2) > 0){
        if(parseFloat(msg.text) && +msg.text && msg.text > 0) {
            controller.prepareToChangeCurrency(chatId, msg.text)
        } else {
            controller.getCurrencySailData(actions[chatId].currency, chatId, actions[chatId].courseBuy )
        }
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

bot.onText(/\/(eurochanging|usdchanging|rubchanging)/, (msg) => {
    const currency = msg.text.replace('changing','').replace('/','').toUpperCase();
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
        bot.sendMessage(id, `Укажите цену покупки для ${currency}`)
    },
    cancelChangeCurrency: (id) => {
        bot.sendMessage(id, `Изменение валюты  ${actions[id].currency} отменено`);
        actions[id] = undefined;
    },
    getCurrencySailData: (currency, id, course) => {

        actions[id] = { status: 'courseSail', currency, courseBuy: course }
        bot.sendMessage(id, `Укажите цену продажи для ${currency}`)
    },
    changeCurrency : async(id) => {

        axios.patch('http://localhost:8001/api/currency', {
            name: actions[id].currency,
            "courseBuy": actions[id].courseBuy,
            "courseSail": actions[id].courseSail,
        })
            .then((res) => {
                bot.sendMessage(id, `Курс валюты  ${actions[id].currency} изменен`);
                actions[id] = undefined;
            })
            .catch((error) => {
                bot.sendMessage(id, `Проблема с сервером, попробуйте позже `);
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
bot.on("polling_error", (err) => logger.log('error', err.message);
    