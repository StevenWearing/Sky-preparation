'use strict'

var task = {
    title: 'My title',
    description: 'My description'
}

Object.defineProperty(task, 'toString', {   // <-- JSON object
    value: function() {
        return this.title + ' ' + this.description;
    },
    writable: false,
    enumerable: false,
    configurable: false
});


// INHERITANCE <><><><><><><><><><><><><><><><><><><><><>
var urgentTask = Object.create(task);
Object.defineProperty(urgentTask, 'toString', {   // <-- JSON object
    value: function() {
        return this.title + ' is urgent';
    },
    writable: false,
    enumerable: false,
    configurable: false
});

console.log(task.toString());
console.log('\n');
console.log(urgentTask.toString());