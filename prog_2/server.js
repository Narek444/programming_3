var express = require("express");
var app = express();
var server = require('http').server(app)
var io = require('socket.io')(server)
var fs = require('fs')

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});

function generator(matLen, gr, grEat, pred, Energy, trap) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3
        }
    }
    for (let i = 0; i < Energy; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }

    }
    for (let i = 0; i < trap; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }

    }
    return matrix;
}

matrix = generator(15, 25, 5, 13, 5, 3);
io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
EnergyArr = []
trapArr = []

Grass = require("./Grass")
grassEater = require("./grassEater")
predator = require("./predator")
trap = require("./trap")
energy = require("./energy")
