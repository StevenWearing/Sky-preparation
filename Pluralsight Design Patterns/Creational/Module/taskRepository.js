var repo = function() {

    var db = {};  // <-- only db Module has access to dbContext

    var get = function(id) {
        console.log('Getting task ' + id);
        return {
            name: 'new task from db'
        }
    }

    var save = function(task) {
        console.log('Saving ' + task.name + ' to the db');
    }


    return {  // <-- nicer to have a list of return things that call functions above
        get: get,
        save: save
    }

}

module.exports = repo(); // <- the "return" section