var Task = function(name) {
    this.name = name;
}

////// MUCH MORE EFFICIENT TO USE PROTOTYPE

Task.prototype.completed = false;
Task.prototype.complete = function() {
    console.log('completing task: ' + this.name);
    this.completed = true;
}
Task.prototype.save = function() {
    console.log('saving Task: ' + this.name);
}

//<><><><><><><><><><>//////////<><><><><><><><><><>//

module.exports = Task;  // Gives us reference to Task constructor
//var Task = require('./task'); <--- inside main.js