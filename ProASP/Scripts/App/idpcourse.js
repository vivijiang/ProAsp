define(["../knockout-2.3.0"], function (ko) {
    return function (data) {
        var self = this;
        self.date = data.date;
        self.courseId = data.courseId;
        self.activitytype = ko.observable(data.activitytype);
        self.description = ko.observable(data.description || "");
        self.idpcss = ko.computed(function () {
            return (!!self.courseId && !!self.activitytype()) ? 'act-' + self.courseId + '-' + self.activitytype() : '';
        });

        self.activitytypeArray = ko.observableArray(["1"]);
        self.showWidget = ko.observable(false);
        self.isSaving = ko.observable(false);
    };
}
  )
