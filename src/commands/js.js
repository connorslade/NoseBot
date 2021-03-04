const common = require('./../common.js');

module.exports = {
    "help": 'Safely Runs Javascript Code',
    "usage": 'js [code]',
    process: function (msg, command) {
        let working = command.join(' ');
        working = working.split('js ')[1];
        if (working.includes('```js')) {
            working = working.replace('```js\n', '```').split('```')[1];
        }
        try {
            let ret = common.runUserCode(working);
            msg.channel.send(common.embedMessage(color.main, 'JS :computer:', `**Code:** \`\`\`${working}\`\`\`\n**Return:** \`${ret}\``));
        } catch (e) {
            msg.channel.send(common.embedMessage(color.red, 'JS :computer:', `**Code:** \`${working}\`\n**Error:** \`${e}\``));
        }
    }
}