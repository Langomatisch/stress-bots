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
        }, 3000); // default 4000 on bukkit.yml
    }
}

test();

function nextBot() {
    console.log(`#${index}`);
    let bot = initBot(index);
    bot.on('login', () => {
        //bot.chat('Wuff');
    })

	timer();
	
	function timer(){
		setTimeout(timer, 1);
		if(bot.entity != undefined){
			let toFollow = `${config["to-follow"]}`;
			//var toFollow = "Block_Eater";
			
			var id, entity, dist;
			var best = null;
			var bestDistance = null;
			if(bot != null){
				for(id in bot.entities) {
					entity = bot.entities[id];
					//if(type && entity.type !== type) continue;
					if(entity === bot.entity) continue;
					dist = bot.entity.position.distanceTo(entity.position);
					var totest = entity.position + '';
					if(!best || dist < bestDistance) {
						if(entity.username == toFollow){
							best = entity;
							bestDistance = dist;
						}
					}
				}
			}
			
			
			
			if(best != null && bot.entity != null){
					if(bot.entity.position.distanceTo(best.position) < 1){
							bot.setControlState('forward', false)
					}else{
						bot.setControlState('forward', true)
					}
				}
				var getY = 0;
				var getY2 = 0;
				
				if(best != null && bot.entity != null){
				
					var getPosition = best.position + '';
					var getPositionSplit = getPosition.split(",");
					getY = getPositionSplit[1];
					
					var getPosition2 = bot.entity.position + '';
					var getPositionSplit2 = getPosition2.split(",");
					getY2 = getPositionSplit2[1];
				
				}
				
				
				if((getY-getY2	) > 0){
					bot.setControlState('jump', true)
				}else{
					bot.setControlState('jump', false)
				}
				if(best != null){
					bot.lookAt(best.position.offset(0, +1.5, 0));
				}
		}
	}
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