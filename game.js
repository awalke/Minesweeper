
function changeColor(elmt) {
	var gameOver = document.getElementById("gameOver");

	if (gameOver.innerHTML != "Game Over") {
		if (elmt.innerHTML != "*") {
			elmt.style.backgroundColor = "white";
			elmt.style.color = "black";
		}
		else {
			elmt.style.backgroundColor = "white";
			elmt.style.color = "black";
			gameOver.innerHTML = "Game Over";
		}
	}
}

function startOver() {
	location.reload();
}

function populate() {
	var t = document.getElementById("minesweeper");
	var random = 0;
	var symbol = "";

	for (i  = 0; i < 10; i++) {
		t.innerHTML += "<tr id=" + i + "> </tr>";
		var tr = document.getElementById(i);

		for (j = 0; j < 10 ; j++) {
			random = getRandom(1, 5);

			if (random == 3) {
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

populate();