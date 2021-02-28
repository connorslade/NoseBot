const randomSeed = require('seedrandom');
const Discord = require("discord.js");
const fs = require("fs");

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

module.exports = {
    embedMessage: function (embedColor, title, text) { return new Discord.MessageEmbed().setColor(embedColor).setTitle(title).setDescription(text) },

    msToTime: function (duration) {
        let milliseconds, seconds, minutes, hours;
        let durationInt = parseInt(duration, 0);
        milliseconds = parseInt((durationInt % 1000) / 100);
        seconds = Math.floor((duration / 1000) % 60);
        minutes = Math.floor((duration / (1000 * 60)) % 60);
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    },

    getFormatDT: function () {
        let currentDate = new Date();
        return (currentDate.getMonth() + 1) + "/"
            + currentDate.getDate() + "/"
            + currentDate.getFullYear() + " — "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds();
    },

    base64ToPng: function (req) {
        let base64Data = req.replace(/^data:image\/png;base64,/, "");
        let buffer = new Buffer.from(base64Data, "base64");
        return new Discord.MessageAttachment(buffer);
    },

    localImgUploads: function (file, name) {
        return new Discord.MessageAttachment(file, name);
    },

    rgbToHex: function (r, g, b) {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
    },

    randomFromSeed: function (string) {
        let rng = randomSeed(string);
        return  rng()
    },

    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    loadConfig: function (configFile) {
        fs.readFile(configFile, 'utf-8', (err, jsonString) => {
            global.config = JSON.parse(jsonString);
            version = config.version;
            commandPrefix = config.commandPrefix;
            return client.login(config.clientId);
        });
    }
}