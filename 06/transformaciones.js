var color = "#000000";
var canvas;
var contexto;

var puntos = []; //arreglo de puntos para guardar las coordenadas de los puntos del poligono


//la recta se define por dos puntos, el punto inicial de la recta
//ser� la posici�n donde se haga clic por primera vez y el punto
//final estara definido por la ubicaci�n del segundo clic
var primerPunto = true; //bandera para controlar los clics

function ponerPixel(contexto, x, y, color) {
    contexto.fillStyle = color;
    contexto.fillRect(x, y, 1, 1);
}


function dibujar(event) { //Esta funci�n se ejecuta cada que se hace clic sobre el lienzo

    canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
    contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

    if (primerPunto) { //Si es el primer clic, se lee el primer punto de la l�nea
        puntos.push({ x: event.offsetX, y: event.offsetY });
        ponerPixel(contexto, puntos[puntos.length - 1].x, puntos[puntos.length - 1].y, color);
        primerPunto = false;
    } else { //pintar l�nea
        lineaBresenham(puntos[puntos.length - 1].x, puntos[puntos.length - 1].y, event.offsetX, event.offsetY, contexto, color);
        puntos.push({ x: event.offsetX, y: event.offsetY });
    }

}

//Implementaci�n del algoritmo de Bresenham para l�neas
function lineaBresenham(x0, y0, x1, y1, contexto, color) {
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    //contexto.fillText( "(" + x1 + "," + y1 + ")", x1+4, y1);

    while (x0 != x1 || y0 != y1) {
        ponerPixel(contexto, x0, y0, color);
        var e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function escalar() {
    var sx = parseInt(document.getElementById("sx").value); //obtenemos el valor 
    var sy = parseInt(document.getElementById("sy").value); //obtenemos el valor 

    var T = new Array();
    T[0] = new Array(sx, 0, 0);
    T[1] = new Array(0, sy, 0);
    T[2] = new Array(0, 0, 1);

    transformar2D(T);
}

function trasladar() {
    var dx = parseInt(document.getElementById("dx").value); //obtenemos el valor 
    var dy = parseInt(document.getElementById("dy").value); //obtenemos el valor 

    var T = new Array();
    T[0] = new Array(1, 0, dx);
    T[1] = new Array(0, 1, dy);
    T[2] = new Array(0, 0, 1);

    transformar2D(T);
}

function mover(x, y) {

    var T = new Array();
    T[0] = new Array(1, 0, x);
    T[1] = new Array(0, 1, y);
    T[2] = new Array(0, 0, 1);

    transformar2D(T);
}

function rotar() {
    var a = parseInt(document.getElementById("angulo").value); //obtenemos el valor del �ngulo de rotaci�n

    var x = puntos[0].x; //guardamos ubicaci�n origial
    var y = puntos[0].y;

    mover(-x, -y); //trasladamos al origen

    var T = new Array();
    T[0] = new Array(Math.cos(a), -Math.sin(a), 0);
    T[1] = new Array(Math.sin(a), Math.cos(a), 0);
    T[2] = new Array(0, 0, 1);

    transformar2D(T); //rotamos

    mover(x, y); //trasladamos a posici�n inicial
}

function transformar2D(m) {
    for (var i = 0; i < puntos.length; i++) {

        var p = new Array(puntos[i].x, puntos[i].y, 1);

        puntos[i].x = Math.round((m[0][0] * p[0]) + (m[0][1] * p[1]) + (m[0][2] * p[2]));
        puntos[i].y = Math.round((m[1][0] * p[0]) + (m[1][1] * p[1]) + (m[1][2] * p[2]));

    }
    repintar();
}


function repintar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas
    for (var i = 1; i < puntos.length; i++) {
        lineaBresenham(puntos[i - 1].x, puntos[i - 1].y, puntos[i].x, puntos[i].y, contexto, color);
    }
}

function cambiarColor() {
    color = document.getElementById("color").value; //obtenemos el color para pintar
    repintar();
}

function reiniciar() {
    puntos = [];
    repintar();
    primerPunto = true;
}