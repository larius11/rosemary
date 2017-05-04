function Customer(groceries, out_time){
	this.cartsize = groceries;
	this.wait_time = out_time;
}

function Register(id){
	this.ID = id;
	this.open = false;
	this.express = false;
	this.line = new Array();
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
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('Hi! How many registers do you want? ', (answer) => {
  // TODO: Log the answer in a database
  var store = new Store(answer);

//   rl.close();
// });

for(i = 0; i<store.num_regs; i++){
	console.log("Register #" + store.regs[i].id + " set-up and ready to go.");
}