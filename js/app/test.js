/**
 * Created by nkuropatkin on 09.10.15.
 */
console.log('init test.js');

require.config({
    // пары "ключ-значение" вашего приложения
    baseUrl: "js/",
    // Обычно тот же каталог, в котором находится сценарий верхнего уровня,
    // указанный в атрибуте data-main
    paths: {
        'underscore'    : 'bower_components/underscore/underscore',
        'backbone'      : 'bower_components/backbone/backbone',
        'jquery'        : 'bower_components/jquery/dist/jquery.min'
    },
    // set up custom paths to libraries, or paths to RequireJS plug-ins
    // используется для настройки адаптеров
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

define(['underscore', 'backbone','jquery'], function(_, Backbone,$) {
    var ListView = Backbone.View.extend({
        render: function(){
            this.$el.html(this.model.toJSON());
        }
    });

    var ItemView = Backbone.View.extend({
        events: {},
        render: function(){
            this.$el.html(this.model.toJSON());
            return this;
        }
    });
});