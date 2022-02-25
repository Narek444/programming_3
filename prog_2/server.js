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

function createObject(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let grEat = new Predator(x, y)
                predatorArr.push(grEat)
            } else if (matrix[y][x] == 4) {
                let Ener = new Energy(x, y)
                EnergyArr.push(Ener)
            } else if (matrix[y][x] == 5) {
                let trap = new Trap(x, y)
                trapArr.push(trap)
            }
        }
    }
    io.sockets.emit("send matrix", matrix);

}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (var i in predatorArr) {

        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (var i in EnergyArr) {
        EnergyArr[i].move()
    }
    for (var i in trapArr) {
        trapArr[i].mul()
        trapArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function () {
    createObject(matrix)
})

var statistics = {}

setInterval(function(){
    statistics.Grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.energy = EnergyArr.length;
    statistics.trap = trapArr.length;
    fs.writeFile("statistics.json",  JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)

