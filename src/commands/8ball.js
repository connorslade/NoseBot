const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: 8Ball', 'Asks the 8Ball\nUsage: `$8ball <question>`'),
    "usage": '8ball <question>',
    process: function (msg, command) {
        let Ball = [
            ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes – definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes'],
            ['Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'],
            ['Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again']];
        if (command.length > 1) {
            let working = command.join(' ').toLowerCase().replace('8ball ', '');
            let answer;
            if (Math.floor(Math.random() * (10 - 1) + 1) <= 4) {
                answer = Ball[2];
            } else {
                answer = Ball[Math.floor(common.randomFromSeed(working.toLowerCase()) * 2)];
            }
            answer = answer[Math.floor(Math.random() * answer.length)];
            msg.channel.send(common.embedMessage(color.Ball, '8Ball :8ball:', `**Question:** \`${working}\`\n**Response:** \`${answer}\``));
        } else {
            msg.channel.send(common.embedMessage(color.Ball, '8Ball :8ball: ', 'No question Supplied\nUsage: `$8ball <question>`'));
        }
    }
}