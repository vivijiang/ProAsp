define(["../knockout-2.3.0"], function (ko) {
    return function (data) {
        var self = this;
        self.monthId = ko.observable(data.monthId);
        self.courseId = data.courseId;
        self.activitytype = ko.observable(data.activitytype);
        self.description = ko.observable(data.description || "");
        self.idpcss = ko.computed(function () {
            return (!!self.courseId && !!self.activitytype()) ? 'idp-act-' + self.courseId  + '-' + self.activitytype() : '';
        });
    };
}
  )
