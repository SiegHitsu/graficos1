var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;

var divisor;
var bias;

var mConv;

document.getElementById('cargar').addEventListener('change', ponerImagen); //se crea un evento "poner imagen" con la direcion cargada


function prepararResultados() { //prepara el esapcio para el proceso...
    lienzoResultado = document.getElementById('canvas2');
    ctxResultado = lienzoResultado.getContext('2d');
    lienzoResultado.height = lienzoOrigen.height;
    lienzoResultado.width = lienzoOrigen.width;
    imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height);
    imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}

function ponerImagen(e) {
    var archivo = e.target.files[0]; //con la direccion del archivo que recibo del evnto me voy a la posicion 0, por si fuera un directorio
    if (archivo) { //compruebo qu se hay cargado       
        var lector = new FileReader();
        lector.readAsDataURL(archivo); //leo los datos como URL       
        lector.onload = function(event) { //le añade un evento al lector con la infoemacio URL
            ponerImgEnCanvas(event.target.result);
        }
    }
}

function ponerImgEnCanvas(datosImg) {
    var img = new Image();
    img.src = datosImg; //convieto y guardo los datos como una imagen
    img.onload = function() { //creo una funcion que perpara el espacio del html
        lienzoOrigen = document.getElementById('canvas');
        ctxOrigen = lienzoOrigen.getContext('2d');
        lienzoOrigen.width = img.width;
        lienzoOrigen.height = img.height;
        ctxOrigen.drawImage(img, 0, 0); //pinta la imagen el el espacio html
        prepararResultados();
    }
}

function convolucion(vecinos) {
    var i = 0;
    var ren, col, r = 0,
        g = 0,
        b = 0,
        a = 0;

    for (ren = 0; ren < 3; ren++)
        for (col = 0; col < 3; col++) {
            r += Math.round(mConv[ren][col] * vecinos[i].r);
            g += Math.round(mConv[ren][col] * vecinos[i].g);
            b += Math.round(mConv[ren][col] * vecinos[i].b);
            a = vecinos[i].a;
            i++;
        }

    r = Math.round(r / divisor);
    g = Math.round(g / divisor);
    b = Math.round(b / divisor);
    r += bias;
    g += bias;
    b += bias;


    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;

    return "rgba(" + r + "," + g + "," + b + "," + a + ")";

}

function procesar() {
    var i;
    var y;
    var x;
    var p;
    var n;
    var pixeles = [];
    var vecinos = [];

    var w = imgOrigen.width;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        pixeles.push({ r: imgOrigen.data[i + 0], g: imgOrigen.data[i + 1], b: imgOrigen.data[i + 2], a: imgOrigen.data[i + 3] });
    }

    i = w + 1; //se aumenta uno par en lugar de x ejemplo 0-5 sea 1-5
    for (y = 1; y < imgOrigen.height - 2; y++)
        for (x = 0; x < imgOrigen.width; x++) {
            p = [i - w - 1, i - w, i - w + 1, i - 1, i, i + 1, i + w - 1, i + w, i + w + 1];
            for (n = 0; n < p.length; n++)
                vecinos.push({ r: pixeles[p[n]].r, g: pixeles[p[n]].g, b: pixeles[p[n]].b, a: pixeles[p[n]].a });
            ctxResultado.fillStyle = convolucion(vecinos);
            ctxResultado.fillRect(x, y, 1, 1);
            i++;
            vecinos = [];
        }
}

function brillo() {
    mConv = new Array();
    mConv[0] = new Array(0, 0, 0);
    mConv[1] = new Array(0, 2, 0);
    mConv[2] = new Array(0, 0, 0);
    divisor = 1;
    bias = 0;
    procesar();
}


function emboss() {
    mConv = new Array();
    mConv[0] = new Array(2, 0, 0);
    mConv[1] = new Array(0, -1, 0);
    mConv[2] = new Array(0, 0, -1);
    divisor = 1;
    bias = 128;
    procesar();
}


function espacial() {
    mConv = new Array();
    mConv[0] = new Array(1 * (1 / 9), 1 * (1 / 9), 1 * (1 / 9));
    mConv[1] = new Array(1 * (1 / 9), 1 * (1 / 9), 1 * (1 / 9));
    mConv[2] = new Array(1 * (1 / 9), 1 * (1 / 9), 1 * (1 / 9));
    divisor = 1;
    bias = 0;
    procesar();
}

function realzante() {
    mConv = new Array();
    mConv[0] = new Array(-1, -1, -1);
    mConv[1] = new Array(-1, 8, -1);
    mConv[2] = new Array(-1, -1, -1);
    divisor = 1;
    bias = 255;
    procesar();
}