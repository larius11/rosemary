function Customer(groceries, out_time){
	this.cartsize = groceries;
	this.wait_time = out_time;
}

function Register(id){
	this.ID = id;
	this.open = false;
	this.express = false;
	this.line = new Array();

	this.status = function () {
		console.log("\nRegister #" + this.ID + " status:");
		console.log("             Open = " + this.open);
		console.log("          Express = "+ this.express);
	}
}

function Store(registers) {
	this.num_regs = registers;
	this.open = true;

	this.regs = new Array();
	for(i = 1; i<=this.num_regs; i++)
		this.regs.push(new Register(i))


	this.open_regs = function () {

		var l = new Array();

		for(i = 0; i<this.num_regs; i++){
			if (this.regs[i].open){
				l.push(this.regs[i]);
			}
		}

		return l;
	};

	this.regs_status = function () {
		console.log(" ");
		for(i = 0; i<this.num_regs; i++){
			console.log("Register #" + this.regs[i].ID + " status:");
			console.log("             Open = " + this.regs[i].open);
			console.log("          Express = "+ this.regs[i].express);
		}

	}
}

console.log('About to begin simulation...\n');

var store;
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout, null);

rl.setPrompt("]");
rl.question('Hi! How many registers do you want? ', function(answer) {

	store = new Store(answer);
	store.regs_status();
	rl.prompt();
});

rl.on('line', function (cmd) {

	if(cmd == "exit"){
	// Exit the loop and end the simulation
		rl.close();
		process.stdin.destroy();

	}else if(cmd.substring(0,4) == "open"){
	// Open a register using a given ID or 'all' to open all registers
		var str = cmd.substring(5);
		if (str=="all"){
			for(i = 0; i < store.num_regs; i++){
				store.regs[i].open = true;
			}
			store.regs_status();
		}else{
			var x = parseInt(str) - 1;
			store.regs[x].open = true;
			store.regs[x].status();
		}
		rl.prompt();

	}else if(cmd.substring(0,5) == "close"){
	// Close a register using a given ID
		var str = cmd.substring(6);
		if (str=="all"){
			for(i = 0; i < store.num_regs; i++){
				store.regs[i].open = false;
			}
			store.regs_status();
		}else{
			var x = parseInt(str) - 1;
			store.regs[x].open = false;
			store.regs[x].status();
		}
		rl.prompt();

	}else if(cmd.substring(0,4) == "flip"){
	// Flip a register between express and regular using a given ID
		var str = cmd.substring(5);
		if (str=="all"){
			for(i = 0; i < store.num_regs; i++){
				if(store.regs[i].express){
					store.regs[i].express = false;
				}else{
					store.regs[i].express = true;
				}
			}
			store.regs_status();
		}else{

			var x = parseInt(str) - 1;

			if(store.regs[x].express){
				store.regs[x].express = false;
			}else{
				store.regs[x].express = true;
			}

			store.regs[x].status();
		}

		rl.prompt();

	}else if(cmd == "status"){
	// Display status of all registers
		store.regs_status();
		rl.prompt();

	}else if(cmd == "help"){
	// Displays commands available
		console.log("\nType \'exit\' to end simulation.");
		console.log("Type \'open X\' to open register with ID # \'X\'");
		console.log("  or \'open all\' to open all registers");
		console.log("Type \'close X\' to close register with ID # \'X\'");
		console.log("  or \'close all\' to close all registers");
		console.log("Type \'status\' to check the current status of the registers");
		rl.prompt();

	}else{
	// Base case for unrecognized input
		console.log("Not a command... Type \'help\' for usage.");
		rl.prompt();

	}
});
