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
            text: 'EUR',
            callback_data: JSON.stringify({
                "currency": "EUR",
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

const getFinalHtml = (information) => `Валюта - <b>${information.currency.toUpperCase()}</b>
Продажа - <b>${information.courseBuy} грн</b>
Покупка - <b>${information.courseSail} грн</b>
  `

const helpText = `
  *Список команд*
  usd - Доллар США
  eur - Евро
  rub - Российский рубль
  `

const commandList = {
    "/usd": true,
    "/eur": true,
    "/rub": true,
}

module.exports.currency_keyboard = currency_keyboard;
module.exports.getFinalHtml = getFinalHtml;
module.exports.prepare_keyboard = prepare_keyboard;
module.exports.helpText = helpText;
module.exports.commandList = commandList;
