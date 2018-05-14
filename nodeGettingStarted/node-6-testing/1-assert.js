var assert = require('assert');
var fun = require('./mathfun');

assert.equal(fun.evenDoublerSync(2), 4); // Checking that argument '2' returns '4'
assert.throws(function() {  // Checking if argument '3' throws an exception
    fun.evenDoublerSync(3);
}, /Odd/); // testing that the exception thrown has the word Odd in it

fun.evenDoubler(2, function(err, results) {
    assert.ifError(err); // Checking to see if an error was returned
    assert.equal(results, 4, "evenDoubler failed on even number"); // Checking if results equals 4, then giving extra message
});

fun.evenDoubler(3, function(err, results) {
    assert.notEqual(err, null); // checking that the error returned is not null when odd number used
});