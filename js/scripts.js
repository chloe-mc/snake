var gridDim = 40;
var gameInterval;

$(document).ready(function(){
	$("body").keydown(function(e){
		snake.changeDirection(e.key);
		if (e.keyCode === 32 && $("#lnkStart").hasClass('disabled') === false) {
			startgame();
		}
	});
	$("#lnkStart").on("click", function(e){
		startgame();
	});
	grid.create();
	snake.reset();	
});

function startgame() {
	$('#lnkStart').addClass('disabled');
	gameInterval = setInterval(function(){ 
		snake.move(); 
		snake.validate();
	}, 100);
	grid.addfood();
}

function gameover() {
	clearInterval(gameInterval);
	snake.reset();
	alert('You lost.');
	$('#lnkStart').removeClass('disabled');
}

var snake = {
	default: {
		head:[20, 20],
		direction: "r",
		body: [[18, 20], [19, 20]]
	},
	reset: function() {
		this.body = [];
		this.head = [];
		this.direction = "";
		grid.clearcolor();
		$.extend(true, this, this.default);
		this.draw();
	},
	draw: function() {
		grid.addsomecolor(this.head[0], this.head[1], "head");
		$.each(this.body, function(i, item) {
			grid.addsomecolor(item[0], item[1], "body");
		});
	},
	clear: function() {
		$(".cell").removeClass("head body");
	},
	move: function() {
		this.clear();
		this.body.shift();
		this.body.push([this.head[0], this.head[1]]);
		switch(this.direction) {
			case 'r':
				this.head[0]++;
				break;	
			case 'l':
				this.head[0]--;
				break;
			case 'u':
				this.head[1]--;
				break;
			case 'd':
				this.head[1]++;
				break;
		}
		this.draw();
	}, 
	validate: function() {
		this.head = grid.checksides(this.head[0], this.head[1]);
		$.each(this.body, function(i, item){
			item = grid.checksides(item[0], item[1]);
		});
		if ($('#' + this.head[0] + '-' + this.head[1]).hasClass('food')){
			this.grow(this.head[0], this.head[1]);
			grid.addfood();
		}
		if ($('#' + this.head[0] + '-' + this.head[1]).hasClass('body')){
			gameover();
		}
	},
	grow: function(x, y) {
		this.body.push([x, y]);
	},
	changeDirection: function(newDir) {
		switch(newDir) {
			case "ArrowDown":
				if (this.direction !== "u") {
					this.direction = "d";
				}				
				break;
			case "ArrowUp":
				if (this.direction !== "d") {
					this.direction = "u";
				}
				break;
			case "ArrowRight":
				if (this.direction !== "l") {
					this.direction = "r";
				}
				break;
			case "ArrowLeft":
				if (this.direction !== "r") {
					this.direction = "l";
				}
				break;
		}
	}
};


var grid = {
	gridDim: gridDim,
	clear: function() {
		$("#grid").html('');
	},
	create: function() {	
		grid.clear();
		for (var i1 = 0; i1 < this.gridDim; i1++) {
			for (var i2 = 0; i2 < this.gridDim; i2++) {
				$("#grid").append('<div class="cell" id="' + i2 + '-' + i1 + '"> </div>');
			}
			$("#grid").append("</br>");
		}
	},
	checksides: function(x, y) {
		if (y > this.gridDim - 1) {
			y = 0;
		} 
		if (y < 0) {
			y = this.gridDim - 1;
		}
		if (x > this.gridDim - 1) {
			x = 0;
		}
		if (x < 0) {
			x = this.gridDim - 1;
		}
		return [x, y];
	},
	addsomecolor: function(x, y, className) {
		$('#' + x + '-' + y).addClass(className);
	},
	clearcolor: function(x, y) {
		$('.cell').removeClass('head body food');
	}, 
	addfood: function() {
		$(".cell").removeClass("food");
		var x = Math.floor(Math.random() * grid.gridDim);
		var y = Math.floor(Math.random() * grid.gridDim);
		$('#' + x + '-' + y).addClass('food');
	}
};






