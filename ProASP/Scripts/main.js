require.config({
    paths: {
        jquery: 'jquery-1.7.2'
    }
});
require(["jquery", "knockout-2.3.0", "App/idp"], function ($, ko, idp) {
    console.log('framework loaded.');
    ko.applyBindings(idp, $("#idpko")[0]);
});