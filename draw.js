function Register(id, given_x, given_y){

	this.ID = id;
	this.x = given_x;
	this.y = given_y;
	this.on = false;
	this.express = false;

	this.draw = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		var img = document.getElementById("reg_closed");
		ctx.drawImage(img,this.x,this.y);

	}

	this.to_green = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(this.x,this.y,100,300);
		var img = document.getElementById("reg_open");
		ctx.drawImage(img,this.x,this.y);		

	}

	this.to_red = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(this.x,this.y,100,300);
		var img = document.getElementById("reg_closed");
		ctx.drawImage(img,this.x,this.y);

	}

	return this;
}

var num_regs;
var registers = new Array();
var x_start = 15;
var y_start = 250;

function loadRegs(){

	num_regs = document.getElementById("regs_num").value;
	document.getElementById("regs_num").value = '';

	if(Number.isInteger(parseInt(num_regs))){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		registers = [];
		x_start = 15;

		if(num_regs>10){
			alert('MAX number is 10. Value set to 10');
			num_regs = 10;
		}

		for(i = 0; i < num_regs; i++){
			registers.push(new Register(i, x_start, y_start));
			registers[i].draw();
			x_start += 110;
		}

	}else{
		alert("Need a number!");
		num_regs = 0;
	}
}

document.addEventListener('keydown', function(event) {

	//Assign canvas element to a variable;
	var canvas = document.getElementById("canvas1");
	//Create HTML5 context object to enable draw methods
	var ctx = canvas.getContext("2d");

    if((event.keyCode == 49)&&(registers[0])){
    	if (registers[0].on){
    		registers[0].to_red();
    		registers[0].on = false;
    	}else{
	    	registers[0].to_green();
	    	registers[0].on = true;
	    }
    }
    else if((event.keyCode == 50)&&(registers[1])){
    	if (registers[1].on){
    		registers[1].to_red();
    		registers[1].on = false;
    	}else{
	    	registers[1].to_green();
	    	registers[1].on = true;
	    }
    }
    else if((event.keyCode == 51)&&(registers[2])){
    	if (registers[2].on){
    		registers[2].to_red();
    		registers[2].on = false;
    	}else{
	    	registers[2].to_green();
	    	registers[2].on = true;
	    }
    }
    else if((event.keyCode == 52)&&(registers[3])){
    	if (registers[3].on){
    		registers[3].to_red();
    		registers[3].on = false;
    	}else{
	    	registers[3].to_green();
	    	registers[3].on = true;
	    }
    }
    else if((event.keyCode == 53)&&(registers[4])){
    	if (registers[4].on){
    		registers[4].to_red();
    		registers[4].on = false;
    	}else{
	    	registers[4].to_green();
	    	registers[4].on = true;
	    }
    }
    else if((event.keyCode == 54)&&(registers[5])){
    	if (registers[5].on){
    		registers[5].to_red();
    		registers[5].on = false;
    	}else{
	    	registers[5].to_green();
	    	registers[5].on = true;
	    }
    }
    else if((event.keyCode == 55)&&(registers[6])){
    	if (registers[6].on){
    		registers[6].to_red();
    		registers[6].on = false;
    	}else{
	    	registers[6].to_green();
	    	registers[6].on = true;
	    }
    }
    else if((event.keyCode == 56)&&(registers[7])){
    	if (registers[7].on){
    		registers[7].to_red();
    		registers[7].on = false;
    	}else{
	    	registers[7].to_green();
	    	registers[7].on = true;
	    }
    }
    else if((event.keyCode == 57)&&(registers[8])){
    	if (registers[8].on){
    		registers[8].to_red();
    		registers[8].on = false;
    	}else{
	    	registers[8].to_green();
	    	registers[8].on = true;
	    }
    }
    else if((event.keyCode == 48)&&(registers[9])){
    	if (registers[9].on){
    		registers[9].to_red();
    		registers[9].on = false;
    	}else{
	    	registers[9].to_green();
	    	registers[9].on = true;
	    }
    }
});

