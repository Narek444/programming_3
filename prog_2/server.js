var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
EnergyArr = [];
trapArr = [];
matrix = [];

var n = 50
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Trap = require("./Trap")
Energy = require("./Energy")

let weathers = ["winter","spring","summer","autumn"]


function rand (min, max){
    return Math.random() * (max - min) + min
}

for(let i = 0; i < n; i++){
    matrix[i] = [];
    for(let j = 0; j < n; j++){
        matrix[i][j] = Math.floor(rand(0,6))
    }
}

io.sockets.emit("send matrix", matrix)

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


function createObject() {

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

// let i = weathers.length - 1;

// function weat() {

//     let weather;
//     weather = weathers[i--];
//     if (i < 0) { i = 3 }
//     io.sockets.emit('weather', weather);
// }
// setInterval(weat, 8000)

// function changeWeather(){
//     weat()
// }


setInterval(game, 300)
io.on('connection', function () {
    createObject();
    // socket.on('chWeather',changeWeather)
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

