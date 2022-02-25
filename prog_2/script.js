
let side = 20;

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
}

