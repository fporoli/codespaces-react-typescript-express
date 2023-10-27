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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseDataStore_1 = require("../models/expenseDataStore");
const expRouter = express_1.default.Router();
expRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setTimeout(function () {
            res.status(200).send((0, expenseDataStore_1.getExpenses)());
        }, 1000);
    }
    catch (e) {
        res.status(500).send({ message: "500-Internal Server Error: " + e });
    }
}));
expRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const item = (0, expenseDataStore_1.find)(id);
        if (item) {
            return res.status(200).send(item);
        }
        res.status(404).send("Expense not found");
    }
    catch (e) {
        res.status(500).send({ message: "500-Internal Server Error: " + e });
    }
}));
expRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        const newItem = (0, expenseDataStore_1.create)(item);
        res.status(201).json(newItem);
    }
    catch (e) {
        res.status(500).json({ message: "500-Internal Server Error: " + e });
    }
}));
expRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const itemUpdate = req.body;
        const existingItem = (0, expenseDataStore_1.find)(id);
        if (existingItem) {
            if (id === itemUpdate.id || (0, expenseDataStore_1.find)(itemUpdate.id) === undefined) {
                // ok to update when Id is unchanged or to update Id object to not existing Id.
                const updatedItem = (0, expenseDataStore_1.update)(id, itemUpdate);
                return res.status(200).json(updatedItem);
            }
            return res.status(500).send("Cannot update. Id exists already!");
        }
        return res.status(500).send("Cannot update. Id does not exists!");
    }
    catch (e) {
        res.status(500).send({ message: "500-Internal Server Error: " + e });
    }
}));
expRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        (0, expenseDataStore_1.remove)(id);
        res.sendStatus(204);
    }
    catch (e) {
        res.status(500).send({ message: "500-Internal Server Error: " + e });
    }
}));
expRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, expenseDataStore_1.reset)();
        res.sendStatus(200);
    }
    catch (e) {
        res.status(500).send({ message: "500-Internal Server Error: " + e });
    }
}));
exports.default = expRouter;
