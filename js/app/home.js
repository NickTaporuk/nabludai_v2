/* start home js*/
/**
 *@author NickTaporuk TEsxtajkfba
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @todo: test web development
 */
function Book(title, author) {}

/** @function
 * @name Todo
 */
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});
var TodosCollection = Backbone.Collection.extend({
    model: Todo
});
var myTodo = new Todo({title:'Read the whole book', id: 2});
// передача массива моделей при создании экземпляра коллекции
var todos = new TodosCollection([myTodo]);
console.log("Collection size: " + todos.length); // Collection size: 1
/*end home js*/