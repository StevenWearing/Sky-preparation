var gradeBook = {
    _grades: [],
    
    reset: function() {
        this._grades = [];
    },

    addGrade: function(grade) {
        this._grades.push(grade);
    },
    
    getCountOfGrades: function() {
        return this._grades.length;
    },

    getAverage: function() {
        var sum = 0;

        for (var grade in this._grades) {
            sum += this._grades[grade];
        }

        return (sum / this._grades.length);
    }
};

exports.book = gradeBook;