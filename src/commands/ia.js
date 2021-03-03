const common = require('./../common.js');
const https = require('https');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Instant Answer', 'Sends you DuckDuckGo Instant Answer! :grin:\nUsage: `$ia [question]`'),
    "usage": 'ia [question]',
    process: function (msg, command) {
        let working = command.join(' ');
        working = working.split('ia ')[1];

        https.get(`https://api.duckduckgo.com/?q=${encodeURI(working)}&format=json&pretty=1&atb=v214-1`, (response) => {
            let todo = '';
            response.on('data', (chunk) => {
                todo += chunk;
            });

            response.on('end', () => {
                let jsonResponse = JSON.parse(todo);
                if (jsonResponse['Abstract'] === "") {
                    msg.channel.send(common.embedMessage(color.red, `**Search:** ${jsonResponse['Heading']} {BETA}`, `No Instant Answer for ${working}`));
                    return;
                }
                let contents = jsonResponse['Infobox']['content'];
                let footerContent = (contents !== undefined) ? `${contents[0]['label']} — ${contents[0]['value']}\n${contents[1]['label']} — ${contents[1]['value']}\n${contents[2]['label']} — ${contents[2]['value']}` : '';
                msg.channel.send(common.embedMessage(color.nose, `**Search:** ${jsonResponse['Heading']} {BETA}`, `\`\`\`${jsonResponse['AbstractText']}\`\`\``).setURL(jsonResponse['AbstractURL']).setFooter(footerContent));
                //TODO: CleanUp Above Line
            });
        });
    }
}