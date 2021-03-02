const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: JS', 'Safely Runs Javascript Code\nUsage: `$js [code]`'),
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