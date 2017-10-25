var grid = [], snake;
var gridDim = 40;

$(document).ready(function(){
	snake = {
		head:[20, 20],
		direction: "r",
		body: [[20, 18], [20, 19], [20, 20]]
	}

	$("body").keydown(function(e){
		switch(e.key) {
			case "ArrowDown":
				if (snake.direction !== "u") {
					snake.direction = "d";
				}				
				break;
			case "ArrowUp":
				if (snake.direction !== "d") {
					snake.direction = "u";
				}
				break;
			case "ArrowRight":
				if (snake.direction !== "l") {
					snake.direction = "r";
				}
				break;
			case "ArrowLeft":
				if (snake.direction !== "r") {
					snake.direction = "l";
				}
				break;
		}
	});

	gogogadgetgrid();
	render();
	drawsnake();	
	startgame();	
});

function drawsnake() {
	addsomecolor(snake.head[0], snake.head[1]);
	$.each(snake.body, function(i, item) {
		addsomecolor(item[0], item[1]);
	});
}

function clearsnake() {
	$(".cell").removeClass("red");
}

function gogogadgetgrid() {	
	for (var i1 = 0; i1 < gridDim; i1++) {
		var row = [];
		for (var i2 = 0; i2 < gridDim; i2++){
			row.push(" ");
		}
		grid.push(row);
	}
}

function render() {
	cleargrid();
	$.each(grid, function(i1, row){
		$.each(row, function (i2, cell){
			$("#grid").append('<div class="cell" id="' + i1 + '-' + i2 + '">' + grid[i1][i2] + "</div>");
		});
		$("#grid").append("</br>");
	});
}

function cleargrid() {
	$("#grid").html('');
}

function startgame() {
	setInterval(function(){ 
		move(); 
		validate();
	}, 300);
}

function move() {
	clearsnake();
	switch(snake.direction) {
		case 'r':
			snake.head[1]++;
			break;	
		case 'l':
			snake.head[1]--;
			break;
		case 'u':
			snake.head[0]--;
			break;
		case 'd':
			snake.head[0]++;
			break;
	}
	snake.body.shift();
	snake.body.push([snake.head[0], snake.head[1]]);
	drawsnake();
}

function validate() {
	snake.head = checksides(snake.head[0], snake.head[1]);
	$.each(snake.body, function(i, item){
		snake.body[i] = checksides(item[0], item[1]);
	});
}

function checksides(x, y) {
	if (y > gridDim - 1) {
		y = 0;
	} 
	if (y < 0) {
		y = gridDim - 1;
	}
	if (x > gridDim - 1) {
		x = 0;
	}
	if (x < 0) {
		x = gridDim - 1;
	}
	return [x, y];
}

function addsomecolor(x, y) {
	$('#' + x + '-' + y).addClass('red');
}

function notsomuchcolor(x, y) {
	$('#' + x + '-' + y).removeClass('red');
}
