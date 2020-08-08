function changeColor(){
	let avail = document.getElementById("Availability").value;
	let colorR = (255 - ((avail) *2.55))%1;
	let colorG = (avail*2.55)%1;
	let colorB = 0

	document.getElementById("availContainer").style.color= (colorR, colorG, colorB); 
	
	
}
var a = document.getElementById("Availability");
a.addEventListener('mouseup', changeColor);