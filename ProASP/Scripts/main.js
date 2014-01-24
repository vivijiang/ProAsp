require.config({
    paths: {
        jquery: 'jquery-1.7.2'
    }
});
require(["jquery", "knockout-2.3.0", "App/idp"], function ($, ko, idp) {
    console.log('framework loaded.');
    var odinIdp = new idp();
    ko.applyBindings(odinIdp, $("#idpko")[0]);
});