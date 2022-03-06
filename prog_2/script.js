var socket = io();
// let weather1 = "winter"

// function changer(){
//     if(weather1 == "winter"){
//         document.getElementById("wstyle").style.color = "#8d05e8";

//     }
//     else{
//         document.getElementById("wstyle").style.color = "white";

//     }
// }










let side = 20;
function setup() {

    createCanvas(15*side,15*side);
    //document.getElementById("weather").innerHTML = weather1;
    //document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]

   // changer();
}

// socket.on("weather", function(data){
//     weather1 = data;
//         document.getElementById("weather").innerHTML = weather1;
//         document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
       
//           changer();

//})

// weathSwitcher = {
//     winter: "white",
//     spring: "#62D319",
//     summer: "green",
//     autum: "#C75520"
// }





function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            // if(matrix[y][x] == 6){
            //     fill(weathSwitcher[weather1]);
            // }
            if (obj == 1) {
                fill("green");
            }
            else if (obj == 0) {
                fill("gray");
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

socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
    
}

function addGrass() {
    socket.emit("add grass")
}

function addGrassEater(){
    socket.emit("add grassEater")
} 
function addPredator(){
    socket.emit("add predator")
}
function addEnergy(){
    socket.emit("add energy")
}
function addTrap(){
    socket.emit("add trap")
}
// function changeWeather(){
//     socket.emit("chWeather")
// }
