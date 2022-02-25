


let side = 20;




function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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
            }else if (matrix[y][x] == 4){
                let Ener = new Energy(x , y)
                EnergyArr.push(Ener)
            }else if (matrix[y][x] == 5){
                let trap = new Trap(x , y)
                trapArr.push(trap)
            }
        }
    }
}

function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            if (obj == 1) {
                fill("green");
            }
            else if (obj == 0) {
                fill("#acacac");
            }
            else if (obj == 2) {
                fill("yellow")
            }
            else if (obj == 3) {
                fill("red")
            }
            else if (obj == 4) {
                fill("blue")
            }
            else if (obj == 5) {
                fill("black")
            }

            rect(x * side, y * side, side, side);
        }
    }
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

}

