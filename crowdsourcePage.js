function changeColor(){
	let avail = document.getElementById("Availability").value;
	let r, g, b;
	if(avail > 50){
		r = Math.floor(255 - ((avail-50)*2 *2.55));
		g = 255
		b = 100;
	}
	else
	{
		r = 255;
		g = Math.floor((avail)*2.55*2);
		b = 100;
	}
	
 
	document.getElementById("availContainer").style.background = "rgb("+r+","+g+","+b+")"; 
	
	
}
var a = document.getElementById("Availability");
a.addEventListener('input', changeColor);