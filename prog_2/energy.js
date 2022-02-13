
class Energy extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 20
        this.multiply = 0

    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
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

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in EnergyArr) {
            if (this.x == EnergyArr[i].x && this.y == EnergyArr[i].y) {
                EnergyArr.splice(i, 1);
                break;
            }
        }
    }

}