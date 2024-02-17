"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
// Create readline interface for input/output
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function readDictionary(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var data, dictionary, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.promises.readFile(filename, 'utf-8')];
                case 1:
                    data = _a.sent();
                    dictionary = data.split('\n').map(function (word) { return word.trim(); });
                    return [2 /*return*/, dictionary];
                case 2:
                    err_1 = _a.sent();
                    console.error('Error reading file:', err_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getStringEditDistance(str1, str2) {
    var len1 = str1.length;
    var len2 = str2.length;
    var dp = Array.from({ length: len1 + 1 }, function () { return Array(len2 + 1).fill(0); });
    for (var i = 0; i <= len1; i++) {
        for (var j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            }
            else if (j === 0) {
                dp[i][j] = i;
            }
            else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[len1][len2];
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var filename, dictionary, inputWord_1, sortedDictionary, top10Suggestions, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    filename = 'words.txt';
                    return [4 /*yield*/, readDictionary(filename)];
                case 1:
                    dictionary = _a.sent();
                    inputWord_1 = 'test';
                    _a.label = 2;
                case 2:
                    if (!(inputWord_1 !== 'exit')) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            rl.question('Type a word to check? ', function (answer) {
                                resolve(answer.trim());
                            });
                        })];
                case 3:
                    inputWord_1 = _a.sent();
                    if (!inputWord_1) {
                        console.log('No input word provided');
                        return [3 /*break*/, 2];
                    }
                    if (inputWord_1 === 'exit') {
                        return [3 /*break*/, 4];
                    }
                    if (dictionary.includes(inputWord_1)) {
                        console.log('The word is in the dictionary');
                        return [3 /*break*/, 2];
                    }
                    sortedDictionary = dictionary.map(function (word) { return ({
                        word: word,
                        score: getStringEditDistance(inputWord_1, word)
                    }); }).sort(function (a, b) { return a.score - b.score; });
                    top10Suggestions = sortedDictionary.slice(0, 10).map(function (item) { return item.word; });
                    console.log('Suggestions:', top10Suggestions);
                    return [3 /*break*/, 2];
                case 4:
                    console.log('Exiting...');
                    return [3 /*break*/, 7];
                case 5:
                    err_2 = _a.sent();
                    console.error('Error:', err_2);
                    return [3 /*break*/, 7];
                case 6:
                    rl.close();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
main();
