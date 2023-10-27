"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var express_1 = require("express");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
