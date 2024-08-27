"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElementInArray = exports.getAnswer = exports.isClaimed = exports.claim = exports.getImage = void 0;
const axios_1 = __importDefault(require("axios"));
async function getImage() {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.infinityg.ai/api/v1/bet/getImg',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const rawData = (await axios_1.default.request(config)).data;
    if (rawData.code == "90000") {
        return rawData.data;
    }
    else {
        console.error(rawData.message);
    }
}
exports.getImage = getImage;
async function claim(userAddress) {
    let data = JSON.stringify({
        "walletAddress": userAddress
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.infinityg.ai/api/v1/bet/claim',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const rawData = (await axios_1.default.request(config)).data;
    if (rawData.code == "90000") {
        return rawData;
    }
    else {
        console.error(rawData.message);
    }
}
exports.claim = claim;
async function isClaimed(userAddress) {
    let data = JSON.stringify({
        "walletAddress": userAddress
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.infinityg.ai/api/v1/bet/canClaim',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const rawData = (await axios_1.default.request(config)).data;
    return rawData;
}
exports.isClaimed = isClaimed;
async function getAnswer(imgId) {
    let data = JSON.stringify({
        "imgId": imgId
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.infinityg.ai/api/v1/bet/getImgById',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const rawData = (await axios_1.default.request(config)).data;
    return rawData.data.answerList;
}
exports.getAnswer = getAnswer;
function isElementInArray(answer, answerList) {
    const lowerCasedElement = answer.toLowerCase();
    return answerList.some(item => item.toLowerCase() === lowerCasedElement);
}
exports.isElementInArray = isElementInArray;
//# sourceMappingURL=utils.js.map