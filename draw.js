window.onload = draw; //Execute draw function when DOM is ready;

function draw(){
	//Assign canvas element to a variable;
	var canvas = document.getElementById("canvas1");
	//Create HTML5 context object to enable draw methods
	var ctx = canvas.getContext("2d");

	//Fill style (r, g, b, alpha);
	ctx.fillStyle = "rgba(245,5,5,1)";
	ctx.shadowColor = "rgba(0,0,0,1)";
	ctx.shadowBlur = 20;
	//Fill Rectangle (X, Y, width, height);
	ctx.fillRect (5, 5, 250, 150);
	//Outline Rectangle (X, Y, width, height);
	ctx.strokeStyle="#000000";
	ctx.strokeRect(5,5,250,150);
	//Outline Circle (X, Y, Radius, start angle, end angle);
	ctx.beginPath();
	ctx.arc(130,200,25,0,2*Math.PI);
	//Fill Circle (Fills path drawn);
	ctx.fill();
	ctx.stroke();

}