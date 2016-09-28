var h2 = document.getElementsByTagName('h2')[0],
seconds = 0, minutes = 0, hours = 0, time;

function flag(elmt) {
	if (elmt.innerHTML.includes("img")) {
		var flag = document.getElementById("flag" + elmt.id);
		flag.style.visibility = "hidden";
	}
	else {
		elmt.innerHTML += "<img src=\"mine_flag.png\" height=\"10\" width=\"10\" id=flag" + elmt.id + ">";
	}
}

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

	if (gameOver.innerHTML != "GAME OVER!" && gameOver.innerHTML != "YOU WIN!") {
		if (!elmt.innerHTML.includes("*")) {
			elmt.style.backgroundColor = "transparent";
			elmt.style.color = "black";
			var flag = document.getElementById("flag" + elmt.id);
			if (flag != null) {
				flag.style.visibility = "hidden";
			}

			if (elmt.innerHTML.includes("0")) {
				revealZeros(elmt);
			}

			win = checkWin();
			if (win) {
				gameOver.innerHTML = "YOU WIN!";
				clearTimeout(time);
				revealAll(elmt);
			}
		}
		else {
			gameOver.innerHTML = "GAME OVER!";
			clearTimeout(time);
			revealAll(elmt);
			var snd = new Audio("bomb.wav");
			snd.play();

		}
	}
}

function revealAll(elmt) {
	for (x = 0; x < 10; x++) {	
		for (y = 0; y < 10; y++) {
			var td = document.getElementById(x.toString() + y.toString());
	
			if (td.innerHTML.includes("*")) {
				td.innerHTML = "<img src=\"mine.png\" height=\"13\" width=\"13\">";
				if (elmt.id == td.id) {
					td.style.backgroundColor = "rgb(255, 204, 204)";
				}
				else {
					td.style.backgroundColor = "transparent";
				}
			}
			else {
				var flag = document.getElementById("flag" + elmt.id);
				
				if (flag != null) {
					flag.visibility.style = "hidden";
				}

				td.style.color = "black";
				td.style.backgroundColor = "transparent";
			}
			
		}
	}
}

function checkForRecursion(td) {
	if (td.innerHTML.includes("0")  && td.style.color !== "black") {
		console.log("true2");
		revealZeros(td);
	} 
	else {
		td.style.backgroundColor = "transparent";
		td.style.color = "black";
	}
}

function revealZeros(td) {
	var x = parseInt(td.id.charAt(0));
	var y = parseInt(td.id.charAt(1));

	td.style.backgroundColor = "transparent";
	td.style.color = "black";

	if (x > 0) {
		tempX = x - 1;
		td = document.getElementById(tempX.toString() + y.toString())
		checkForRecursion(td);
	}

	if (y > 0) {
		tempY = y - 1;
		td = document.getElementById(x.toString() + tempY.toString())
		checkForRecursion(td);
	}
	if (x < 9) {
		tempX = x + 1;
		td = document.getElementById(tempX.toString() + y.toString())
		checkForRecursion(td);
	}

	if (y < 9) {
		tempY = y + 1;
		td = document.getElementById(x.toString() + tempY.toString())
		checkForRecursion(td);
	}
	
	if(x > 0 && y > 0) {
		tempX = x - 1;
		tempY = y - 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		checkForRecursion(td);
	}
	
	if(x < 9 && y < 9) {
		tempX = x + 1;
		tempY = y + 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		checkForRecursion(td);
	}
	
	if (x > 0 && y < 9) {
		tempX = x - 1;
		tempY = y + 1
		td = document.getElementById(tempX.toString() + tempY.toString())
		checkForRecursion(td);
	}

	if (x < 9 && y > 0) {
		tempX = x + 1;
		tempY = y - 1;
		td = document.getElementById(tempX.toString() + tempY.toString());

		checkForRecursion(td);
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

	var gameOver = document.getElementById("gameOver");
	gameOver.innerHTML = "";

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

	var gameOver = document.getElementById("gameOver");
	gameOver.innerHTML = "";

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

	var gameOver = document.getElementById("gameOver");
	gameOver.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "#383838";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "#383838";

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

			tr.innerHTML += "<td id= " + i + j + " onclick=changeColor(this)  oncontextmenu=\"flag(this);return false;\">" + symbol + "</td>";
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

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if (y > 0) {
				tempY = y - 1;
				td = document.getElementById(x.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}	

			if (x < 9) {
				tempX = x + 1;
				td = document.getElementById(tempX.toString() + y.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if (y < 9) {
				tempY = y + 1;
				td = document.getElementById(x.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if(x > 0 && y > 0) {
				tempX = x - 1;
				tempY = y - 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if(x < 9 && y < 9) {
				tempX = x + 1;
				tempY = y + 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if (x > 0 && y < 9) {
				tempX = x - 1;
				tempY = y + 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if (x < 9 && y > 0) {
				tempX = x + 1;
				tempY = y - 1;

				td = document.getElementById(tempX.toString() + tempY.toString());

				if (td.innerHTML.includes("*")) {
					cellCount++;
				}
			}

			if (!current.innerHTML.includes("*")) {
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
				if (!td.innerHTML.includes("*")) {
					win = false;
				}
			}
		}
	}

	return win;
}