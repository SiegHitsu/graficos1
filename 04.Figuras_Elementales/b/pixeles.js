function ponerPixel(contexto, x, y, r, g, b, a){

  contexto.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; //configura el color para pintado

  //pintar un punto (debe ser 1x1, para mejorar su visualización es de 3x3)
  contexto.fillRect( x, y, 3, 3 );

}

function dibujar(){ //Esta función es llamada al cargar el documento html

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo

  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo
  
  for (var i=0; i<1000; i++){ //pintaremos 1000 pixeles
    
    //obtenemos las coordenadas x,y al azar
    var x = Math.floor((Math.random() * 400) + 1);
    var y = Math.floor((Math.random() * 400) + 1);

    //obtenemos las intensidades de los canales RGBa del pixel al azar
    var r = Math.floor((Math.random() * 255) + 1);  //componente roja entre 0 y 255
    var g = Math.floor((Math.random() * 255) + 1);  //componente verde  entre 0 y 255
    var b = Math.floor((Math.random() * 255) + 1);  //componente azul  entre 0 y 255
    var a = Math.random();  //la transparencia del pixel es un número real entre 0 y 1

    ponerPixel(contexto, x, y, r, g, b, a);  //pintamos el pixel
  }
 
} 
