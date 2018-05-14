var book = require("../lib/grades").book;

exports["setUp"] = function(callback) {
    book.reset();
    callback();
}


exports["Can add new grade"] = function(test) {  // <-- passing in test object that nodeunit will provide
    // Arrange
    book.addGrade(90);
    
    // Act
    var count = book.getCountOfGrades();

    // Assert
    test.equal(count, 1);
    test.done();
}


exports["Can average grades"] = function(test) {
    // Arrange
    book.addGrade(100);
    book.addGrade(50);

    // Act
    var average = book.getAverage();

    // Assert
    test.equal(average, 75);
    test.done();
}