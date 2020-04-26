"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var income = this.transactions.reduce(function (prev, curr) {
            return curr.type === 'income' ? prev + curr.value : prev;
        }, 0);
        var outcome = this.transactions.reduce(function (prev, curr) {
            return curr.type === 'outcome' ? prev + curr.value : prev;
        }, 0);
        return {
            income: income,
            outcome: outcome,
            total: income - outcome,
        };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        var transaction = new Transaction_1.default({ value: value, type: type, title: title });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
