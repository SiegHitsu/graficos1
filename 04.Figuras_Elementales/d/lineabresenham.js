//xi, yi se usan para guardar las coordenadas del primer punto de la recta
var xi=0; 
var yi=0;

//la recta se define por dos puntos, el punto inicial de la recta
//ser� la posici�n donde se haga clic por primera vez y el punto
//final estara definido por la ubicaci�n del segundo clic
var primerPunto=true;  //bandera para controlar los clics
 
function ponerPixel(contexto, x,y, color){
    contexto.fillStyle = color;
    contexto.fillRect(x, y, 1, 1);
} 

//Para pintar una recta esta funci�n deber� ser ejecutada dos veces
//la primera vez captura las coordenadas del punto incial de la recta
// y lo grafica sobre el lienzo. La segunda vez toma las coordenadas
//del segundo punto y pinta la l�nea llamando a la funci�n lineaBresenham.

function dibujar(event){  //Esta funci�n se ejecuta cada que se hace clic sobre el lienzo
  var form = document.getElementById("f");
	var color = form.elements["c"].value;
  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  if(primerPunto){  //Si es el primer clic, se lee el primer punto de la l�nea
    xi=event.offsetX;  //Guardamos la abscisa
    yi=event.offsetY;  //guardamos la ordenada
    ponerPixel(contexto, xi, yi, color);  //ponemos el pixel en rosa
    contexto.fillText( "(" + xi + "," + yi + ")", xi+4, yi);
  }
  else  //Si es el segundo clic, pintamos la l�nea con los valores xi, yi
        //y la posici�n del �ltimo clic del rat�n (event.offsetX, event.offsetY)
    lineaBresenham(xi, yi, event.offsetX, event.offsetY, contexto, color);
    primerPunto =!primerPunto;
  
}


//Implementaci�n del algoritmo de Bresenham para l�neas
function lineaBresenham(x0, y0, x1, y1, contexto, color){
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;

   while(x0!=x1 || y0!=y1){
     ponerPixel(contexto, x0, y0, color);
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
   
    xi=x1;
    yi=y1;
    contexto.fillText( "(" + xi + "," + yi + ")", xi+4, yi);
    primerPunto =!primerPunto;
    
}





