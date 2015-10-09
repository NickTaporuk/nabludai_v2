/**
 * Created by nkuropatkin on 09.10.15.
 */
console.log('init app.js');

require.config({
// пары "ключ-значение" вашего приложения
    baseUrl: "app",
// Обычно тот же каталог, в котором находится сценарий верхнего уровня,
// указанный в атрибуте data-main
    paths: {},
// set up custom paths to libraries, or paths to RequireJS plug-ins
    shim: {}, // используется для настройки адаптеров (подробнее см. ниже)
});