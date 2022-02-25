let LivingCreature = require('./LivingCreature')

module.exports = class Trap extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 3
        this.multiply = 0
    }

    mul() {
        this.multiply++
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newtrap = new Trap(newX, newY);
            trapArr.push(newtrap);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = super.chooseCell(3)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }
        } 
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in trapArr) {
            if (this.x == trapArr[i].x && this.y == trapArr[i].y) {
                trapArr.splice(i, 1);
                break;
            }
        }
    }
}