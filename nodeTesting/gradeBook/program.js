var book = require("./lib/grades").book;
var express = require("express");
var app = express();

app.get("/", function(req, res) {
     res.sendFile("C:/Users/steven/Documents/_ Sky/nodeTesting/gradeBook/index.html");
});

app.get("/grade", function(req, res) {   // http://localhost:3000/grade?grades=10,12

    var grades = req.query.grades.split(",");
    for (var i = 0; i < grades.length; i++) {
        book.addGrade(parseInt(grades[i]));
    }
    var average = book.getAverage();

    res.send("Your average is " + average);
});

app.listen(3000);
console.log("Server ready...");
