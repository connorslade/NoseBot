const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    embedMessage: function (embedColor, title, text) { return new Discord.MessageEmbed().setColor(embedColor).setTitle(title).setDescription(text) },

    msToTime: function (duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    },

    getFormatDT: function () {
        var currentdate = new Date();
        var datetime =
            (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + "/"
            + currentdate.getFullYear() + " — "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        return datetime
    },

    loadConfig: function (configFile) {
        fs.readFile(configFile, 'utf-8', (err, jsonString) => {
            global.config = JSON.parse(jsonString);
            version = config.version;
            commandPrefix = config.commandPrefix;
            client.login(config.clientId);
        });
    }
}