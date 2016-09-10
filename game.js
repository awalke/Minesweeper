easy();

function changeColor(elmt) {
	var gameOver = document.getElementById("gameOver");

	if (gameOver.innerHTML != "Game Over") {
		if (elmt.innerHTML != "*") {
			elmt.style.backgroundColor = "transparent";
			elmt.style.color = "black";
		}
		else {
			gameOver.innerHTML = "Game Over!";

			for (x = 0; x < 10; x++) {
		
				for (y = 0; y < 10; y++) {
					var td = document.getElementById(x.toString() + y.toString());
					

					if (td.innerHTML == "*" ) {
						console.log(td.id);
						td.innerHTML = "<img src=\"bomb.png\" height=\"10\" width=\"10\">";
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
	}
}

function startOver() {
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
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "#00bfff";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "black";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "black";

	populate(10);
}

function medium() {
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "black";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "#00bfff";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "black";

	populate(5);
}

function hard() {
	var t = document.getElementById("minesweeper");
	t.innerHTML = "";

	var easyButton = document.getElementById("easy");
	easyButton.style.backgroundColor = "black";

	var mediumButton = document.getElementById("medium");
	mediumButton.style.backgroundColor = "black";

	var hardButton = document.getElementById("hard");
	hardButton.style.backgroundColor = "#00bfff";

	populate(3);
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

			if (current.innerHTML != "*") {
				current.innerHTML = cellCount;
			}

			cellCount = 0;

		}
	}
}