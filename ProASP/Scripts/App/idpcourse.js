define(["../knockout-2.3.0"], function (ko) {
    return function (data) {
        var self = this;
        self.date = data.date;
        self.courseId = data.courseId;
        self.activitytype = ko.observable(data.activitytype);
        self.description = ko.observable(data.description || "");
        self.idpcss = ko.computed(function () {
            var activitytype = self.activitytype();
            var courseId = self.courseId;
            var css = 'act-add';

            if (activitytype == 'unconfirmed') {
                css = 'act-unconfirmed';
            }
            else if (!!courseId && !!activitytype) {
                css = 'act-' + self.courseId + '-' + self.activitytype();
            }
            return css;
        });

        self.activitytypeArray = ko.observableArray(data.activitytypeArray);
        self.showWidget = ko.observable(false);
        self.isSaving = ko.observable(false);
        
        self.clickActivity = function (data) {
            self.activitytype(data.activityId);
        };
        
        self.deleteActivity = function (data) {
            data.activitytype(null);
        };
    };
}
  )
