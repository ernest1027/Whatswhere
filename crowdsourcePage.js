function changeColor(){
	let avail = document.getElementById("Availability").value;
<<<<<<< HEAD
	let colorR = (255 - ((avail) *2.55))%1;
	let colorG = (avail*2.55)%1;
	let colorB = 0

	document.getElementById("availContainer").style.color= (colorR, colorG, colorB); 
	
=======
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
>>>>>>> bdd6cbbc2614bde4f6f743e5be6dced3b0321766
	
 
	document.getElementById("availContainer").style.background = "rgb("+r+","+g+","+b+")"; 
	
	
}
var a = document.getElementById("Availability");
a.addEventListener('input', changeColor);