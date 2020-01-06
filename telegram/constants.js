const currency_keyboard = [
    [
        {
            text: 'USD',
            callback_data: JSON.stringify({
                "currency": "USD",
                "action": "change_currency",
            })
        },
        {
            text: 'EURO',
            callback_data: JSON.stringify({
                "currency": "EURO",
                "action": "change_currency",
            })
        },
        {
            text: 'RUB',
            callback_data: JSON.stringify({
                "currency": "RUB",
                "action": "change_currency",
            })
        }
    ]
]

const prepare_keyboard = [
    [
        {
            text: 'Отмена',
            callback_data: JSON.stringify({ action: 'cancelChangeCurrency'}),
        },
        {
            text: 'Подтвердить',
            callback_data: JSON.stringify({ action: 'acceptChangeCurrency'}),
        }
    ]
]

const getFinalHtml = (information) => `Валюта - <b>${information.currency}</b>
Продажа - <b>${information.courseBuy} грн</b>
Покупка - <b>${information.courseSail} грн</b>
  `

const helpText = `
  *Список команд*
  change - Поменять курс валюты из списка предложенных
  eurochanging - Изменить цену покупки/продажи евро
  usdchanging - Изменить цену покупки/продажи доллара
  rubchanging - Изменить цену покупки/продажи рубля
  help - Вызвать эту помощь
  `

const commandList = {
    "/change": true,
    "/eurochanging": true,
    "/usdchanging": true,
    "/rubchanging": true,
    "/help": true,
}

module.exports.currency_keyboard = currency_keyboard;
module.exports.getFinalHtml = getFinalHtml;
module.exports.prepare_keyboard = prepare_keyboard;
module.exports.helpText = helpText;
module.exports.commandList = commandList;
