var h2 = document.getElementsByTagName('h2')[0],
seconds = 0, minutes = 0, hours = 0, time;

function add() {
	seconds++;
	if (seconds >= 60) {
		seconds = 0;
		minutes++;
	}
	
	h2.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	timer();
}
function timer() {
	time = setTimeout(add, 1000);
}

function resetTimer(){
	clearTimeout(time);
	h2.textContent = "00:00";
	seconds = 0; minutes = 0;
	timer();
}

easy();

function changeColor(elmt) {
	var gameOver = document.getElementById("gameOver");
	var win = false;

	if (gameOver.innerHTML != "Game Over" && gameOver.innerHTML != "You Win!") {
		if (elmt.innerHTML != "*") {
			elmt.style.backgroundColor = "transparent";
			elmt.style.color = "black";
			revealZeros(elmt);
			win = checkWin();
			if (win) {
				gameOver.innerHTML = "You Win!";
				revealAll(elmt);
			}
		}
		else {
			gameOver.innerHTML = "GAME OVER	";
			revealAll(elmt);
			var snd = new Audio("bomb.wav");
			snd.play();
		}
	}
}

function revealAll(elmt) {
	clearTimeout(time);
	for (x = 0; x < 10; x++) {	
		for (y = 0; y < 10; y++) {
			var td = document.getElementById(x.toString() + y.toString());
	
			if (td.innerHTML == "*" ) {
				td.innerHTML = "<img src=\"mine.png\" height=\"10\" width=\"10\">";
				if (elmt.id == td.id) {
					td.style.backgroundColor = "rgb(255, 204, 204)";
				}
				else {
					td.style.backgroundColor = "transparent";
				}
			}
			else {
				td.style.color = "black";
				td.style.backgroundColor = "transparent";
			}
			
		}
	}
}

function revealZeros(td) {
	var x = parseInt(td.id.charAt(0));
	var y = parseInt(td.id.charAt(1));

	if (x > 0) {
		tempX = x - 1;
		td = document.getElementById(tempX.toString() + y.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}

	if (y > 0) {
		tempY = y - 1;
		td = document.getElementById(x.toString() + tempY.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}
	if (x < 9) {
		tempX = x + 1;
		td = document.getElementById(tempX.toString() + y.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}

	if (y < 9) {
		tempY = y + 1;
		td = document.getElementById(x.toString() + tempY.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}
	
	if(x > 0 && y > 0) {
		tempX = x - 1;
		tempY = y - 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}
	
	if(x < 9 && y < 9) {
		tempX = x + 1;
		tempY = y + 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}
	
	if (x > 0 && y < 9) {
		tempX = x - 1;
		tempY = y + 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}

	if (x < 9 && y > 0) {
		tempX = x + 1;
		tempY = y - 1;
		td = document.getElementById(tempX.toString() + tempY.toString());

		if (td.innerHTML == "0") {
			td.style.backgroundColor = "transparent";
			td.style.color = "black";
		}
	}
}

function startOver() {
	resetTimer();
	
	var gameOver = document.getElementById("gameOver");
	var easyButton = document.getElementById("easy");
	var mediumButton = document.getElementById("medium");
	var hardButton = document.getElementById("hard");

	gameOver.innerHTML = "";

	if (easyButton.style.backgroundColor == "rgb(0, 191, 255)") {
		easy();
	}

	else if (mediumButton.style.backgroundColor == "rgb(0, 191, 255)") {
		medium();
	}

	else if (hardButton.style.backgroundColor == "rgb(0, 191, 255)") {
		hard();
	}
}

function easy() {
	resetTimer();
	
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "#00bfff";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "#383838";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "#383838";

	populate(10);
}

function medium() {
	resetTimer();
	
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "#383838";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "#00bfff";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "#383838";

	populate(7);
}

function hard() {
	resetTimer();
	
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "black";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "black";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "#00bfff";

	populate(5);
}


function populate(max) {
	var t = document.getElementById("minesweeper");
	var random = 0;
	var symbol = "";

	for (i  = 0; i < 10; i++) {
		t.innerHTML += "<tr id=" + i + "> </tr>";
		var tr = document.getElementById(i);

		for (j = 0; j < 10 ; j++) {
			random = getRandom(1, max);

			if (random == 1) {
				symbol = "*";
			}
			else {
				symbol = "";
			}

			tr.innerHTML += "<td id= " + i + j + " onclick=changeColor(this)>" + symbol + "</td>";
		}
	}

	populateNumbers();
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function populateNumbers() {
	var cellCount = 0;

	for (x = 0; x < 10; x++) {
		
		for (y = 0; y < 10; y++) {
			var tempX = 0;
			var tempY = 0;

			var current = document.getElementById(x.toString() + y.toString());
			var td = document.getElementById(x.toString() + y.toString());

			if (x > 0) {
				tempX = x - 1;
				td = document.getElementById(tempX.toString() + y.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if (y > 0) {
				tempY = y - 1;
				td = document.getElementById(x.toString() + tempY.toString());

				if (td.innerHTML == "*" ) {
					cellCount++;
				}
			}	

			if (x < 9) {
				tempX = x + 1;
				td = document.getElementById(tempX.toString() + y.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if (y < 9) {
				tempY = y + 1;
				td = document.getElementById(x.toString() + tempY.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if(x > 0 && y > 0) {
				tempX = x - 1;
				tempY = y - 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if(x < 9 && y < 9) {
				tempX = x + 1;
				tempY = y + 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if (x > 0 && y < 9) {
				tempX = x - 1;
				tempY = y + 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if (x < 9 && y > 0) {
				tempX = x + 1;
				tempY = y - 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML == "*") {
					cellCount++;
				}
			}

			if (current.innerHTML != "*") {
				current.innerHTML = cellCount;
			}

			cellCount = 0;

		}
	}
}

function checkWin() {
	var win = true;

	for (x = 0; x < 10; x++) {
		
		for (y = 0; y < 10; y++) {
			var td = document.getElementById(x.toString() + y.toString());

			if (td.style.backgroundColor == "") {
				if (td.innerHTML != "*") {
					win = false;
				}
			}
		}
	}

	return win;
}
