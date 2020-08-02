function changeColor(){
	let avail = document.getElementById("Availability").value;
	if(avail==0){
		document.getElementById("availContainer").style.backgroundColor = "red";
	}
	if(avail==1){
		document.getElementById("availContainer").style.backgroundColor = "orange";
	}
	if(avail==2){
		document.getElementById("availContainer").style.backgroundColor = "yellow";
	}
	if(avail==3){
		document.getElementById("availContainer").style.backgroundColor = "green";
	}
	if(avail==4){
		document.getElementById("availContainer").style.backgroundColor = "green";
	}
	
}
var a = document.getElementById("Availability");
a.addEventListener('mouseup', changeColor);