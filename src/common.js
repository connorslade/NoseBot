//TODO:Clean up this file (It really Needs it lol)
const randomSeed = require('seedrandom');
const Discord = require("discord.js");
const {VM} = require('vm2');
const fs = require("fs");

global.color = {
    "main": "#2fc290",
    "help": "#E8DD4D",
    "red": "#DB5953",
    "link": "#27E2E8",
    "nose": "#00EAFF",
    "minecraft": "#00FF6C",
    "Ball": "#5AA2DE",
    "amongUs": "#FFDF1E"
};

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function compareTwoStrings(first, second) {
    //From https://github.com/aceakash/string-similarity
    first = first.replace(/\s+/g, '')
    second = second.replace(/\s+/g, '')

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
        const bigram = first.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram) + 1
            : 1;

        firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram)
            : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

module.exports = {

    base64ToPng: function (req) {
        let base64Data = req.replace(/^data:image\/png;base64,/, "");
        let buffer = new Buffer.from(base64Data, "base64");
        return new Discord.MessageAttachment(buffer);
    },

    embedMessage: function (embedColor, title, text) {
        return new Discord.MessageEmbed().setColor(embedColor).setTitle(title).setDescription(text)
    },

    findBestMatch: function (mainString, targetStrings) {
        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = compareTwoStrings(mainString, currentTargetString)
            ratings.push({target: currentTargetString, rating: currentRating})
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i
            }
        }
        const bestMatch = ratings[bestMatchIndex]

        return {ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex};
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

    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    loadConfig: function (configFile) {
        fs.readFile(configFile, 'utf-8', (err, jsonString) => {
            global.config = JSON.parse(jsonString);
            version = config.version;
            global.commandPrefix = config.commandPrefix;
            return client.login(config.clientId);
        });
    },

    localImgUploads: function (file, name) {
        return new Discord.MessageAttachment(file, name);
    },

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

    numberWithCommas: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    randomFromSeed: function (string) {
        let rng = randomSeed(string);
        return rng()
    },

    rgbToHex: function (r, g, b) {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
    },

    runUserCode: function (code) {
        const vm = new VM({
            timeout: 1000,
            sandbox: {isSandBox: true},
            eval: false,
            wasm: false
        });
        return vm.run(code);
    }
}