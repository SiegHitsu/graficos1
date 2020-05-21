var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;


document.getElementById('cargar').addEventListener('change', leerImagen);


function leerImagen(e) {
    var archivo = e.target.files[0];
    if (archivo) {
        var lector = new FileReader();
        lector.readAsDataURL(archivo);
        lector.onload = function(event) {
            ponerImgEnCanvas(event.target.result);
        }
    }
}

function ponerImgEnCanvas(datosImg) {
    var img = new Image();
    img.src = datosImg;
    img.onload = function() {
        lienzoOrigen = document.getElementById('canvas');
        ctxOrigen = lienzoOrigen.getContext('2d');
        lienzoOrigen.width = img.width;
        lienzoOrigen.height = img.height;
        ctxOrigen.drawImage(img, 0, 0);
        prepararResultados();
    }
}

function prepararResultados() {
    lienzoResultado = document.getElementById('canvas2');
    ctxResultado = lienzoResultado.getContext('2d');
    lienzoResultado.height = lienzoOrigen.height;
    lienzoResultado.width = lienzoOrigen.width;
    imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height);
    imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}

function copiar() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {

        imgResultado.data[i + 0] = imgOrigen.data[i + 0];
        imgResultado.data[i + 1] = imgOrigen.data[i + 1];
        imgResultado.data[i + 2] = imgOrigen.data[i + 2];
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function promedio() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var prom = (imgOrigen.data[i + 0] + imgOrigen.data[i + 1] + imgOrigen.data[i + 2]) / 3;

        imgResultado.data[i + 0] = prom;
        imgResultado.data[i + 1] = prom;
        imgResultado.data[i + 2] = prom;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function correccion() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = (imgOrigen.data[i + 0] * 0.3 + imgOrigen.data[i + 1] * 0.59 + imgOrigen.data[i + 2] * 0.11)
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function correccion() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = (imgOrigen.data[i + 0] * 0.3 + imgOrigen.data[i + 1] * 0.59 + imgOrigen.data[i + 2] * 0.11)
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}


function desa() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = 0 + (Math.max(imgOrigen.data[i + 0], imgOrigen.data[i + 1], imgOrigen.data[i + 2]) + Math.min(imgOrigen.data[i + 0], imgOrigen.data[i + 1], imgOrigen.data[i + 2]) / 2);
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function descmax() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = Math.max(imgOrigen.data[i + 0], imgOrigen.data[i + 1], imgOrigen.data[i + 2]);
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function descmin() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = Math.min(imgOrigen.data[i + 0], imgOrigen.data[i + 1], imgOrigen.data[i + 2]);
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function rojo() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = imgOrigen.data[i + 0];
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function verde() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = imgOrigen.data[i + 1];
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}

function azul() {
    var i;
    for (i = 0; i < imgOrigen.data.length; i += 4) {
        var gray = imgOrigen.data[i + 2];
        imgResultado.data[i + 0] = gray;
        imgResultado.data[i + 1] = gray;
        imgResultado.data[i + 2] = gray;
        imgResultado.data[i + 3] = imgOrigen.data[i + 3];
    }

    ctxResultado.putImageData(imgResultado, 0, 0);
}