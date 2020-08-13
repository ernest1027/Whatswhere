<<<<<<< HEAD
// function changeColor(){
// 	let avail = document.getElementById("Availability").value;
// 	let r, g, b;
// 	if(avail > 50){
// 		r = Math.floor(255 - ((avail-50)*2 *2.55));
// 		g = 255
// 		b = 100;
// 	}
// 	else
// 	{
// 		r = 255;
// 		g = Math.floor((avail)*2.55*2);
// 		b = 100;
// 	}
	
 
// 	document.getElementById("availContainer").style.background = "rgb("+r+","+g+","+b+")"; 
	
	
// }
// var a = document.getElementById("Availability");
// a.addEventListener('input', changeColor);

const $element = $('input[type="range"]');
const $tooltip = $('#range-tooltip');
const sliderStates = [
  {name: "1", tooltip: "<strong>Out of stock</strong>", range: _.range(0, 10) },
  {name: "2", tooltip: "<strong>A few left</strong>", range: _.range(10, 20)},
  {name: "3", tooltip: "<strong>A good amount available</strong>", range: _.range(20, 30)},
  {name: "4", tooltip: "<strong>Plenty available</strong>", range: _.range(30, 40)},
  {name: "5", tooltip: "<strong>Fully in stock</strong>", range: _.range(40, 50)},
];
var currentState;
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
      updateState($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
    checkState($handle[0], this.value);
  });

// Update the value inside the slider handle
function updateHandle(el, val) {
  el.textContent = val;
}

// Check if the slider state has changed
function checkState(el, val) {
  // if the value does not fall in the range of the current state, update that shit.
  if (!_.contains(currentState.range, parseInt(val))) {
    updateState(el, val);
  }
}

// Change the state of the slider
function updateState(el, val) {
  for (var j = 0; j < sliderStates.length; j++){
    if (_.contains(sliderStates[j].range, parseInt(val))) {
      currentState = sliderStates[j];
      // updateSlider();
    }
  }
  // If the state is high, update the handle count to read 50+
  if (currentState.name == "high") {
    updateHandle($handle[0], "50+");
  }
  // Update handle color
  $handle
    .removeClass (function (index, css) {
    return (css.match (/(^|\s)js-\S+/g) ||   []).join(' ');
  })
    .addClass("js-" + currentState.name);
  // Update tooltip
  $tooltip.html(currentState.tooltip);
}
=======
function changeColor() {
  let avail = document.getElementById("Availability").value;
  let r, g, b;
  if (avail > 50) {
    r = Math.floor(255 - (avail - 50) * 2 * 2.55);
    g = 255;
    b = 100;
  } else {
    r = 255;
    g = Math.floor(avail * 2.55 * 2);
    b = 100;
  }

  document.getElementById("availContainer").style.background =
    "rgb(" + r + "," + g + "," + b + ")";
}
var a = document.getElementById("Availability");
a.addEventListener("input", changeColor);
>>>>>>> a28b9d912a4b8fd2dec72479926f4683d92fe579
