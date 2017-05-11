window.onload = drawStatic; //Execute draw function when DOM is ready;

function drawStatic(){

	//Assign canvas element to a variable;
	var canvas = document.getElementById("canvas1");
	//Create HTML5 context object to enable draw methods
	var ctx = canvas.getContext("2d");

	//Fill style (r, g, b, alpha);
	ctx.fillStyle = "rgba(245,5,5,1)";
	ctx.shadowColor = "rgba(0,0,0,1)";
	ctx.shadowBlur = 20;

	//Fill Rectangle (X, Y, width, height);
	// ctx.fillRect (5, 5, 250, 150);

	//Outline Rectangle (X, Y, width, height);
	// ctx.strokeStyle="#000000";
	// ctx.strokeRect(5,5,250,150);

}

function Customer(groceries, out_time, given_x, given_y){
	this.cartsize = groceries;
	this.wait_time = out_time;
	this.x = given_x;
	this.y = given_y;
	this.on = false;

	this.draw = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		//Fill style (r, g, b, alpha);
		ctx.fillStyle = "rgba(245,5,5,1)";
		ctx.shadowColor = "rgba(0,0,0,1)";
		ctx.shadowBlur = 1;

		//Outline Circle (X, Y, Radius, start angle, end angle);
		ctx.beginPath();
		ctx.arc(this.x,this.y,20,0,2*Math.PI);

		//Fill Circle (Fills path drawn);
		ctx.fill();
		ctx.stroke();

	}

	this.erase = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(this.x-22,this.y-22,44,44);
	}

	this.to_green = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(this.x-22,this.y-22,44,44);

		//Fill style (r, g, b, alpha);
		ctx.fillStyle = "rgba(31,171,40,1)";
		ctx.shadowColor = "rgba(0,0,0,1)";
		ctx.shadowBlur = 1;

		//Outline Circle (X, Y, Radius, start angle, end angle);
		ctx.beginPath();
		ctx.arc(this.x,this.y,20,0,2*Math.PI);

		//Fill Circle (Fills path drawn);
		ctx.fill();
		ctx.stroke();

	}

	this.to_red = function (){

		//Assign canvas element to a variable;
		var canvas = document.getElementById("canvas1");
		//Create HTML5 context object to enable draw methods
		var ctx = canvas.getContext("2d");

		ctx.clearRect(this.x-22,this.y-22,44,44);

		//Fill style (r, g, b, alpha);
		ctx.fillStyle = "rgba(245,5,5,1)";
		ctx.shadowColor = "rgba(0,0,0,1)";
		ctx.shadowBlur = 1;

		//Outline Circle (X, Y, Radius, start angle, end angle);
		ctx.beginPath();
		ctx.arc(this.x,this.y,20,0,2*Math.PI);

		//Fill Circle (Fills path drawn);
		ctx.fill();
		ctx.stroke();

	}

	return this;
}

var cust_1 = new Customer(50, 50, 25, 25);
var cust_2 = new Customer(50, 50, 75, 25);
var cust_3 = new Customer(50, 50, 125, 25);

document.addEventListener('keydown', function(event) {

	//Assign canvas element to a variable;
	var canvas = document.getElementById("canvas1");
	//Create HTML5 context object to enable draw methods
	var ctx = canvas.getContext("2d");

    if(event.keyCode == 37) {
        ctx.fillStyle = "rgba(220,50,50,1)";
        ctx.shadowColor = "rgba(0,0,0,1)";
        ctx.shadowBlur = 10;
        ctx.fillRect (5, 5, 250, 150);
        ctx.strokeStyle="#000000";
		ctx.strokeRect(5,5,250,150);
    }
    else if(event.keyCode == 39) {
        ctx.clearRect(0, 0, 270, 165);
    }
    else if(event.keyCode == 67){
    	cust_1.draw();
    	cust_2.draw();
    	cust_3.draw();
    }
    else if(event.keyCode == 49){
    	if (cust_1.on){
    		cust_1.to_red();
    		cust_1.on = false;
    	}else{
	    	cust_1.to_green();
	    	cust_1.on = true;
	    }
    }
    else if(event.keyCode == 50){
    	if (cust_2.on){
    		cust_2.to_red();
    		cust_2.on = false;
    	}else{
	    	cust_2.to_green();
    		cust_2.on = true;
	    }
    }
    else if(event.keyCode == 51){
    	if (cust_3.on){
    		cust_3.to_red();
    		cust_3.on = false;
    	}else{
	    	cust_3.to_green();
    		cust_3.on = true;
	    }
    }
});

