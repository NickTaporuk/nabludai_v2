/* start home js*/
/**
 * This is a root model for Todo
 * @author NickTaporuk
 * @name module:Todo
 * @class Todo
 * @module models/Todo
 * @name Todo
 * @constructor
 * @augments Backbone.Model
 */
var Todo = Backbone.Model.extend(
    /** @lends module:Todo.prototype */
    {
        /** @lends Todo.prototype */

        /**
         * Generic tap event
         * @name Todo.onTap
         * @function
         * @param defaults
         */
    defaults: {
        /**
         * This collection contains model1s
         * @memberof! module:Module1.Module1/Collections/Collection2
         * @type {module:Module1.Module1/Models/Model2}
         */
        title: '',
        /**
         * URL to item list
         * @memberof! module:Module1.Module1/Collections/Collection2
         */
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

var View = Backbone.View.extend({
    el: '#todo',
// привязка к DOM-событию с помощью свойства event
    events: {
        'click [type="checkbox"]': 'clicked'
    },
    initialize: function () {
// привязка к DOM-событию с помощью jQuery
        this.$el.click(this.jqueryClicked);
// Привязка к API-событию
        this.on('apiEvent', this.callback);
    },
// 'this' указывает на представление
    clicked: function(event) {
        console.log("events handler for " + this.el.outerHTML);
        this.trigger('apiEvent', event.type);
    },
// 'this' указывает на обрабатывающий DOM-элемент
    jqueryClicked: function(event) {
        console.log("jQuery handler for " + this.outerHTML);
    },
    callback: function(eventType) {
        console.log("event type was " + eventType);
    }
});
var view = new View();

function a (){
    alert(111);
}