$(document).ready(function(){
	$(document).keydown(function(e){
		snake.changeDirection(e.keyCode);
		if (e.keyCode === 32 && $("#lnkStart").hasClass('disabled') === false) {
			game.start();
		}
	});
	$("#lnkStart").on("click", function(e){
		game.start();
	});
	grid.create();
	snake.reset();	
});



var game = {
	start: function() {
		$('#lnkStart').addClass('disabled');
		this.interval = setInterval(function(){ 
			snake.move(); 
			snake.validate();
		}, 100);
		grid.addfood();
	},
	over: function() {
		clearInterval(this.interval);
		snake.reset();
		alert('You lost.');
		$('#lnkStart').removeClass('disabled');
	}
};





var grid = {
	gridDim: 30,
	clear: function() {
		$("#grid").html('');
	},
	create: function() {	
		grid.clear();
		for (var i1 = 0; i1 < this.gridDim; i1++) {
			for (var i2 = 0; i2 < this.gridDim; i2++) {
				$("#grid").append('<div class="cell" id="' + i2 + '-' + i1 + '"> </div>');
			}
			$("#grid").append("<br/>");
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





var snake = {
	default: {
		head:[Math.ceil(grid.gridDim / 2), Math.ceil(grid.gridDim / 2)],
		direction: "r",
		body: [
			[Math.ceil(grid.gridDim / 2) - 2, Math.ceil(grid.gridDim / 2)],
			[Math.ceil(grid.gridDim / 2) - 1, Math.ceil(grid.gridDim / 2)]
		]
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
			game.over();
		}
	},
	grow: function(x, y) {
		this.body.push([x, y]);
	},
	changeDirection: function(keyCode) {
		switch(keyCode) {
			case 40: //"ArrowDown"
				if (this.direction !== "u") {
					this.direction = "d";
				}				
				break;
			case 38: //"ArrowUp"
				if (this.direction !== "d") {
					this.direction = "u";
				}
				break;
			case 39: //"ArrowRight"
				if (this.direction !== "l") {
					this.direction = "r";
				}
				break;
			case 37: //"ArrowLeft"
				if (this.direction !== "r") {
					this.direction = "l";
				}
				break;
		}
	}
};









