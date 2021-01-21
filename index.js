const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
let date_ob = new Date();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('\033[33m-------- Logging Started --------\033[0m')
});
client.on('message', async msg => {
    var message = msg.content
    let cDate = date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();
    console.log('[' + cDate + '] ' + msg.author['username'] + '#' + msg.author['discriminator'] + ': ' + msg.content)
    fs.appendFileSync("V:\\Programming\\Discord\\NoseBot\\Logs\\" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + '-' + ("0" + date_ob.getDate()).slice(-2) + '-' + date_ob.getFullYear() + '.log', '[' + cDate + '] ' + msg.author['username'] + '#' + msg.author['discriminator'] + ': ' + msg.content + '\n');
    if (message.includes('nose')) {
        console.log('\033[32m' + msg.author['username'] + '#' + msg.author['discriminator'] + ': ' + msg.content + '\033[0m')
        msg.reply('Nose!');
        x = Math.floor((Math.random() * 89) + 1);
        msg.reply('https://connorcode.com/Main_Assets/Noses/'+x+'.jpg');
        
    }if (message.includes('$nosespam')){
        msg.reply('Nose!');
        for (i = 0; i < 2; i++) { 
            x = Math.floor((Math.random() * 89) + 1);
        msg.reply('https://connorcode.com/Main_Assets/Noses/'+x+'.jpg');
    }
 }
});

client.login('NzE3OTY4NTc5MzM2NjAxNjYx.XtiCrQ.vO6f8ZJ00fRdiYuo8cdfrnj-xmo');