var TodoRouter = Backbone.Router.extend({
    /* определение таблиц маршрутов и функций для этого маршрутизатора */
    routes: {
        "about" : "showAbout",
        "search/:query" : "searchTodos",
        "search/:query/p:page" : "searchTodos"
    },
    showAbout: function(){
        alert('showAbout');
    },
    searchTodos: function(query, page){
        var page_number = page || 1;
        console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
    }
});
var myTodoRouter = new TodoRouter();
Backbone.history.start();
// перейдите в консоль и проверьте:
// http://localhost/#search/job/p3, в журнале: Page number: 3 of the results for
// todos containing the word: job
// http://localhost/#search/job, в журнале: Page number: 1 of the results for
// todos co