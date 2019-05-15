"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const tiny_shortener_1 = require("tiny-shortener");
const createRegExp = emoji_regex_1.default();
const removeProtocol = ({ message }) => __awaiter(this, void 0, void 0, function* () { return (yield tiny_shortener_1.tiny(message)).replace('https://', ''); });
const sanitizeURL = ({ message }) => __awaiter(this, void 0, void 0, function* () {
    // https://stackoverflow.com/a/17773849/7092954
    const matched = message.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gm);
    if (null !== matched) {
        return yield matched.reduce((acc, URL) => __awaiter(this, void 0, void 0, function* () {
            return (yield acc).replace(URL, yield removeProtocol({ message: URL }));
        }), Promise.resolve(message));
    }
    return message;
});
exports.messageToString = ({ message }) => message.replace(createRegExp, '');
exports.parseSpoilerText = ({ message }) => __awaiter(this, void 0, void 0, function* () {
    const name = message.match(/["“]((?:\\.|[^"\\])*)[”"]/);
    const sanitize = message.replace(/\s*["“]((?:\\.|[^"\\])*)[”"]\s*/, '');
    return {
        name: (null === name) ? '' : name[1],
        description: yield sanitizeURL({ message: sanitize })
    };
});
exports.toBoolean = ({ message }) => ('true' === message) ? true : false;
