/**
 * Created by nkuropatkin on 09.10.15.
 */
console.log('init app.js');

require.config({
    // пары "ключ-значение" вашего приложения
    baseUrl: "js/app",
    // Обычно тот же каталог, в котором находится сценарий верхнего уровня,
    // указанный в атрибуте data-main
    paths: {
        'underscore'    : '../bower_components/underscore/underscore-min.js',
        'backbone'      : '../bower_components/backbone/backbone',
        'backbone'      : '../bower_components/jquery/dist/jquery.min.js'
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