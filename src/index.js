var minecraft = require('mineflayer');
let config = require('../config/config.json');
let amount = config["bot-amount"];

let index = 0;
function test() {
    console.log(amount);
    if(index <= amount) {
        index++;
        setTimeout(() => {
            nextBot();
            test();
        }, 100); // default 4000 on bukkit.yml
    }
}

test();

function nextBot() {
    console.log(`#${index}`);
    let bot = initBot(index);
    bot.on('login', () => {
        bot.chat('Heyho!');
    })
}

function initBot(index) {
    let username = `${config["bot-prefix"]}${index}`;
    try {
        console.log(username);
        return minecraft.createBot({
            host: config.server.adress, 
            port: config.server.port,         
            username,
            //version: '1.16.1', 1.8 is tested working
          });
    }catch(error) {
        console.log(`Error connecting to ${config.server.adress}:${config.server.port} @ ${username}`)
        console.log(error)
    }
}