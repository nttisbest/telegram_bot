const TelegramBot = require('node-telegram-bot-api');
const request = require('request')
const http = require('http')

// replace the value below with the Telegram token you receive from @BotFather
const token = '736063896:AAHrR9xNfSlutiFzPeIeWi5oQfguYHL2zpk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    // match  [ '/echo 1', '1', index: 0, input: '/echo 1', groups: undefined ]
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
bot.onText(/\/help/, (msg, match) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '查询天气---$天气+城市；eg：$天气深圳\n\查电影---$电影+电影名； eg:电影绿皮书 \n\ vpn订阅节点----$订阅节点 \n\直接获取ss链接----$梯子 ')
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // console.log(msg)
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');


    let suburl = 'http://sub.wangboqing.top/wangboqing'
    // 返回ss 信息
    if (msg.text.indexOf('$') != -1 && msg.text.indexOf('梯子')!=-1 && msg.text != '') {
        // if(msg.text.indexOf('订阅节点')){

        // }
        console.log('11')
        // let textkey = msg.text.slice(1)
        http.get(suburl, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('请求失败\n' +
                    `状态码: ${statusCode}`);
            } else if (!/^application\/octet-stream/.test(contentType)) {
                error = new Error('无效的 content-type.\n' +
                    `期望的是 application/json 但接收到的是 ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // 消费响应数据来释放内存。
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    //   console.log(rawData)
                    // rawData = rawData.toString()
                    rawData = new Buffer(rawData, 'base64').toString();
                    console.log(rawData);
                    bot.sendMessage(chatId, rawData)
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`出现错误: ${e.message}`);
        });
    } 
    if(msg.text.indexOf('$') != -1 && msg.text.indexOf('订阅节点') != -1 && msg.text != '') {
        bot.sendMessage(chatId, suburl)
    }


    // 检测   今天天气
    // console.log(msg.text)
    if (msg.text.indexOf('$') != -1 && msg.text.indexOf('天气') != -1 && msg.text != '') {
        // console.log('$')
        let city = msg.text.slice(3)
        //    console.log(city)
        let uncity = city
        city = encodeURI(city)
        request({ url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city, gzip: true }, function (err, res, body) {
            //    console.log(res)
            if (!err && res.statusCode == 200) {
                body = JSON.parse(body)
                //    bot.sendMessage(chatId,body)
                for (var i = 0; i < body.data.forecast.length; i++) {
                    // bot.sendMessage(chatId,body.data.forecast[i])
                    switch (i) {
                        case 0:
                            bot.sendMessage(chatId, uncity + '今天的天气:' + body.data.forecast[i].high + ' ' + '风力：' + body.data.forecast[i].fengli.slice(10, 12) + ' ' + body.data.forecast[i].low + ' ' + body.data.forecast[i].fengxiang + ' ' + body.data.forecast[i].type + '；感冒几率： ' + body.data.ganmao)
                            break;
                        case 1:
                            bot.sendMessage(chatId, uncity + '明天的天气:' + body.data.forecast[i].high + ' ' + '风力：' + body.data.forecast[i].fengli.slice(10, 12) + ' ' + body.data.forecast[i].low + ' ' + body.data.forecast[i].fengxiang + ' ' + body.data.forecast[i].type + '；感冒几率： ' + body.data.ganmao)
                            break
                        case 2:
                            bot.sendMessage(chatId, uncity + '后天的天气:' + body.data.forecast[i].high + ' ' + '风力：' + body.data.forecast[i].fengli.slice(10, 12) + ' ' + body.data.forecast[i].low + ' ' + body.data.forecast[i].fengxiang + ' ' + body.data.forecast[i].type + '；感冒几率： ' + body.data.ganmao)
                            break
                        case 3:
                            bot.sendMessage(chatId, uncity + '大后天的天气:' + body.data.forecast[i].high + ' ' + '风力：' + body.data.forecast[i].fengli.slice(10, 12) + ' ' + body.data.forecast[i].low + ' ' + body.data.forecast[i].fengxiang + ' ' + body.data.forecast[i].type + '；感冒几率： ' + body.data.ganmao)
                            break
                        case 4:
                            bot.sendMessage(chatId, uncity + '大大后天的天气:' + body.data.forecast[i].high + ' ' + '风力：' + body.data.forecast[i].fengli.slice(10, 12) + ' ' + body.data.forecast[i].low + ' ' + body.data.forecast[i].fengxiang + ' ' + body.data.forecast[i].type + '；感冒几率： ' + body.data.ganmao)
                            break
                        default:
                            break;
                    }
                }


            }
            // else {
            //     //    console.log(err)
            // }
        })
    }



    switch (msg.text) {
        case '辣鸡':
            bot.sendMessage(chatId, '不要说粗话！要打屁屁')
            break;
        case '垃圾':
            bot.sendMessage(chatId, '不要说粗话！要打屁屁')
            break;
        case '滚':
            bot.sendMessage(chatId, '不要说粗话！要打屁屁')
            break;
        case '王博庆是谁':
            bot.sendMessage(chatId, '是我家主人，最帅的那个！')
            break;
        case '王博庆帅不帅':
            bot.sendMessage(chatId, '我家主人最帅！')
            break;
        case '高璐玲':
            bot.sendMessage(chatId, '高300是个辣鸡！')
            break;
        case '笨':
            bot.sendMessage(chatId, '不要说粗话！要打屁屁')
            break;
        case '王博庆是猪':
            bot.sendMessage(chatId, '哼，' + msg.from.first_name + '才是猪')
            break;
        case '高璐玲是猪':
            bot.sendMessage(chatId, '对，高璐玲就是猪！')
            break;

        default:
            break;
    }
});
