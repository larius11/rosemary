var num_regs;
var registers = new Array();
var waitlist = new Array();
var x_start = 15;
var y_start = 250;
var glob_ID = 1;
var pause = false;

//Assign canvas element to a variable;
var canvas = document.getElementById("canvas1");
//Create HTML5 context object to enable draw methods
var ctx = canvas.getContext("2d");
ctx.font = "400 15px Ubuntu";
ctx.fillStyle = 'rgb(4,222,4)';
ctx.lineWidth = 5;

function init(){

	populateStore();

	num_regs = document.getElementById("regs_num").value;
	document.getElementById("regs_num").value = '';

	if(Number.isInteger(parseInt(num_regs))){

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		x_start = 15;
		registers = [];

		if(num_regs>10){
			alert('MAX number is 10. Value set to 10');
			num_regs = 10;
		}

		for(var i = 0; i < num_regs; i++){
			registers.push(new Register(i, x_start, y_start));
			// for(j = 0; j<=i; j++){
			// 	registers[i].line.push(new Customer(j,10,-10));
			// }
			x_start += 110;
		}

		window.setInterval(update, 30);
		window.setInterval(populateStore, 10000);

	}else{
		alert("Need a number!");
		num_regs = 0;
	}
}

function Register(id, given_x, given_y){

	this.ID = id;
	this.x = given_x;
	this.y = given_y;
	this.on = false;
	this.express = false;
	this.line = [];

	this.draw = function (){

		var img;

		if (this.on && this.express){
			img = document.getElementById("reg_express");
		}else if (this.on){
			img = document.getElementById("reg_open");
		} else {
			this.express = false;
			img = document.getElementById("reg_closed");
		}
		
		ctx.drawImage(img,this.x,this.y);

		var y_offset = 185;

		for (var i = 0; (this.line[i]) && (i < 3); i++) {
			this.line[i].draw(this.x+50,this.y+y_offset, false);
			y_offset -= 60;
		}

		if (this.line.length > 3){
			var txt = (this.line.length - 3) + "";
			ctx.fillText(txt, this.x + 50, this.y-32);
		}

	}

	return this;
}

function Customer(bag_size){

	if (glob_ID == 100){
		glob_ID = 1;
	}

	this.ID = glob_ID++;
	this.bag_size = bag_size;
	this.wait_ticks = bag_size * -500;

	this.draw = function (given_x, given_y, waiting) {

		ctx.beginPath();
		ctx.arc(given_x,given_y,24,0,2*Math.PI);

		var R, G, slope;

		slope = 7;
		R = 4;
		G = 222;

		for (var i = 0; (i < this.bag_size)&&(i < 32) ; i++) {
			R += slope;
			G -= slope;
		}

		ctx.fillStyle = 'rgb('+R+', '+G+', 4)';


		// if(this.bag_size<16){
		// 	ctx.fillStyle = 'rgb(4,222,4)';
		// }else if (this.bag_size<31){
		// 	ctx.fillStyle = 'rgb(222,222,4)';
		// }else {
		// 	ctx.fillStyle = 'rgb(222,4,4)';
		// }

      	ctx.fill();
		ctx.stroke();

		ctx.fillStyle = 'black';
		ctx.textAlign = "center"; 
		ctx.fillText(this.ID, given_x, given_y);

		if (waiting){
			var txt = Math.ceil(-1*(this.wait_ticks/1000)) + " secs";
			// ctx.fillStyle = 'black';
			ctx.fillText(txt, given_x, given_y+40);			
		}

	};

}

function chooseRegister(cust){

	//Select a desireable register. 
	//Add the customer to a register's line

	var coin = Math.random();
	var p = 0.5;
	var result = coin - p;
	var small_order = (cust.bag_size < 16);

	if (result < 0){
		//smart
		var best;

		for (var i = 0; i < registers.length; i++) {
			
			if (registers[i].on){
				if(small_order && registers[i].express){
					if (!best){
						best = registers[i];
					}else if (best.line.length > registers[i].line.length){
						best = registers[i];
					}
				}else if (!small_order && !registers[i].express){
					if (!best){
						best = registers[i];
					}else if (best.line.length > registers[i].line.length){
						best = registers[i];
					}
				}
			}

		}

		if (best){
			best.line.push(cust);
		}else{
			cust.wait_ticks = -30;
			waitlist.push(cust);
		}

	}else{
		//pendejo

		var temp = new Array();

		for (var i = 0; i < registers.length; i++) {
			if (registers[i].on){
				temp.push(registers[i]);		
			}
		}

		if (temp.length>0){
			temp[Math.floor(Math.random()*temp.length)].line.push(cust);
		}else{
			cust.wait_ticks = -30;
			waitlist.push(cust);
		}

	}

}

function updateRegisters() {

	for (var i = 0; i < registers.length; i++) {

		for (var j = 0; j < registers[i].line.length; j++) {

			var current = registers[i].line[j];

			if (j==0)
				current.bag_size -= 0.14;
			current.wait_ticks += 30;
			
		}

		if (registers[i].line[0])
			if (registers[i].line[0].bag_size<=0)
				registers[i].line.shift();
		
	}

}

function populateStore() {
	if (!pause){
		if (waitlist.length <= 50){
			var ran_customers, ran_bagsize;

			ran_customers = Math.floor(Math.random() * 21);

			for(var i = 0; i<ran_customers; i++){

				ran_bagsize = Math.floor(Math.random() * 51);
				waitlist.push(new Customer(ran_bagsize));

			}

			waitlist.sort(function(a, b){
				return b.wait_ticks - a.wait_ticks;
			});
		}
	}
}

function update() {

	if(!pause){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var wait_x = 32;
		var wait_y = 32;

		for(var i = 0; waitlist[i]; i++){
			if (waitlist[i].wait_ticks < 0){
				waitlist[i].draw( wait_x, wait_y , true);
				waitlist[i].wait_ticks+=30;
				wait_x += 72;
			}else{
				var movedCustomer = waitlist.splice(i, 1)[0];
				chooseRegister(movedCustomer);
				i--;
			}
		}

		for(var i = 0; registers[i]; i++){
			registers[i].draw();
		}

		updateRegisters();
	}

}

document.addEventListener('keydown', function(event) {

    if((event.keyCode == 49)&&(registers[0])){
    	if (registers[0].on){
    		// registers[0].to_red();
    		registers[0].on = false;
    	}else{
	    	// registers[0].to_green();
	    	registers[0].on = true;
	    }
    }
    else if((event.keyCode == 50)&&(registers[1])){
    	if (registers[1].on){
    		// registers[1].to_red();
    		registers[1].on = false;
    	}else{
	    	// registers[1].to_green();
	    	registers[1].on = true;
	    }
    }
    else if((event.keyCode == 51)&&(registers[2])){
    	if (registers[2].on){
    		// registers[2].to_red();
    		registers[2].on = false;
    	}else{
	    	// registers[2].to_green();
	    	registers[2].on = true;
	    }
    }
    else if((event.keyCode == 52)&&(registers[3])){
    	if (registers[3].on){
    		// registers[3].to_red();
    		registers[3].on = false;
    	}else{
	    	// registers[3].to_green();
	    	registers[3].on = true;
	    }
    }
    else if((event.keyCode == 53)&&(registers[4])){
    	if (registers[4].on){
    		// registers[4].to_red();
    		registers[4].on = false;
    	}else{
	    	// registers[4].to_green();
	    	registers[4].on = true;
	    }
    }
    else if((event.keyCode == 54)&&(registers[5])){
    	if (registers[5].on){
    		// registers[5].to_red();
    		registers[5].on = false;
    	}else{
	    	// registers[5].to_green();
	    	registers[5].on = true;
	    }
    }
    else if((event.keyCode == 55)&&(registers[6])){
    	if (registers[6].on){
    		// registers[6].to_red();
    		registers[6].on = false;
    	}else{
	    	// registers[6].to_green();
	    	registers[6].on = true;
	    }
    }
    else if((event.keyCode == 56)&&(registers[7])){
    	if (registers[7].on){
    		// registers[7].to_red();
    		registers[7].on = false;
    	}else{
	    	// registers[7].to_green();
	    	registers[7].on = true;
	    }
    }
    else if((event.keyCode == 57)&&(registers[8])){
    	if (registers[8].on){
    		// registers[8].to_red();
    		registers[8].on = false;
    	}else{
	    	// registers[8].to_green();
	    	registers[8].on = true;
	    }
    }
    else if((event.keyCode == 48)&&(registers[9])){
    	if (registers[9].on){
    		// registers[9].to_red();
    		registers[9].on = false;
    	}else{
	    	// registers[9].to_green();
	    	registers[9].on = true;
	    }
    }

    // EXPRESS KEYS!!!!

    if((event.keyCode == 81)&&(registers[0])){
    	if (registers[0].express){
    		registers[0].express = false;
    	}else{
	    	registers[0].express = true;
	    }
    }
    else if((event.keyCode == 87)&&(registers[1])){
    	if (registers[1].express){
    		registers[1].express = false;
    	}else{
	    	registers[1].express = true;
	    }
    }
    else if((event.keyCode == 69)&&(registers[2])){
    	if (registers[2].express){
    		registers[2].express = false;
    	}else{
	    	registers[2].express = true;
	    }
    }
    else if((event.keyCode == 82)&&(registers[3])){
    	if (registers[3].express){
    		registers[3].express = false;
    	}else{
	    	registers[3].express = true;
	    }
    }
    else if((event.keyCode == 84)&&(registers[4])){
    	if (registers[4].express){
    		registers[4].express = false;
    	}else{
	    	registers[4].express = true;
	    }
    }
    else if((event.keyCode == 89)&&(registers[5])){
    	if (registers[5].express){
    		registers[5].express = false;
    	}else{
	    	registers[5].express = true;
	    }
    }
    else if((event.keyCode == 85)&&(registers[6])){
    	if (registers[6].express){
    		registers[6].express = false;
    	}else{
	    	registers[6].express = true;
	    }
    }
    else if((event.keyCode == 73)&&(registers[7])){
    	if (registers[7].express){
    		registers[7].express = false;
    	}else{
	    	registers[7].express = true;
	    }
    }
    else if((event.keyCode == 79)&&(registers[8])){
    	if (registers[8].express){
    		registers[8].express = false;
    	}else{
	    	registers[8].express = true;
	    }
    }
    else if((event.keyCode == 80)&&(registers[9])){
    	if (registers[9].express){
    		registers[9].express = false;
    	}else{
	    	registers[9].express = true;
	    }
    }
    else if(event.keyCode == 32){
    	pause = !pause;
    }
});

