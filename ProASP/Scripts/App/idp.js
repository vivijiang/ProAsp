define(["./corecourse", "./idpcourse", "knockout-2.3.0"], function (corecourse, idpcourse, ko) {
    console.log("idp->" + corecourse);

    function _getIdpCourseViewModel(timestamps, _idpCourses1, courseId) {
        var idpCourse1View = [];
        var index = timestamps.length;
        var len = index;
        for (; index; index--) {
            var currenttimestamp = timestamps[len - index];
            var currentidpcourse = _idpCourses1[0];
            if (_idpCourses1.length && currenttimestamp.MonthId == currentidpcourse.date.MonthId) {
                idpCourse1View.push(currentidpcourse);
                _idpCourses1.shift();
            } else {
                idpCourse1View.push(new idpcourse({
                    monthId: currenttimestamp.MonthId,
                    courseId: courseId
                }));
            }
        }
        return idpCourse1View;
    }

    function PlanDate(date) {
        this.DateString = date.toLocaleDateString();
        this.MonthId = date.getMonth() + 1;
        this.MonthText = '';
        this.Year = date.getFullYear();
    }

    function _getTimeRangeArray(startTime, timeSpan) {
        var timeArray = [];
        var currentTime = new Date(startTime);
        timeArray.push(new PlanDate(currentTime));
        var index = 1;
        for (; index < timeSpan; index++) {
            currentTime = new Date(currentTime.setMonth(currentTime.getMonth() + 1));
            timeArray.push(new PlanDate(currentTime));
        }
        return timeArray;
    }

    var _idpContactName = "Vicky Zhou";
    var _idpIndex = "4";
    var _idpStart = '2013/09';
    var _idpSpan = 12; // default 12month for one IDP, include the start month
    var timestamps = _getTimeRangeArray("2013/09", 12);

    var _tableHead = {
        colName: "Core Course",
        courses: [{
            courseName: "NTB book5",//ntb book5 -- NTBb1.1.1
            courseId: "ntb_5",
            startMonthId: 9,
            monthSpan: 4
        },
        {
            courseName: "NTB book6",//ntb book5 -- NTBb1.1.1
            courseId: "ntb_6",
            startMonthId: 1,
            monthSpan: 6
        },
        {
            courseName: "",//exams
            courseId: null,
            startMonthId: 7,
            monthSpan: 2
        }]

    };


    var _idpCourses1 = [
        new idpcourse({
            date: new PlanDate(new Date("2013/9")),
            courseId: "1",
            activitytype: "1",
            description: 'blabla',

        }),
        new idpcourse({
            date: new PlanDate(new Date("2013/12")),
            courseId: "1",
            activitytype: "1",
            description: 'test description',
        })

    ];

    var _idpCourse1View = _getIdpCourseViewModel(timestamps, _idpCourses1, 1);


    var _idpCourses2 = [
    new idpcourse({
        date: new PlanDate(new Date("2013/10")),
        courseId: "2",
        activitytype: "2",
        description: 'blablabla'
    }),
    new idpcourse({
        date: new PlanDate(new Date("2014/02")),
        courseId: "2",
        activitytype: "3",
        description: 'test'
    })

    ];


    var _idpCourses2View = _getIdpCourseViewModel(timestamps, _idpCourses2, 2);

    var _idpCourses3 = [
new idpcourse({
    date: new PlanDate(new Date("2013/11")),
    courseId: "3",
    activitytype: "1",
    description: 'blablabla'
}),
new idpcourse({
    date: new PlanDate(new Date("2014/04")),
    courseId: "3",
    activitytype: "2",
    description: 'test'
})
    ];

    var _idpCourses3View = _getIdpCourseViewModel(timestamps, _idpCourses3, 3);


    var _planDetail = ko.observableArray(
        [{
            coursesCol: new corecourse({
                courseName: 'Life Club',
                courseId: "1"
            }),
            courses: ko.observableArray(_idpCourse1View)
        },
            {
                coursesCol: new corecourse({
                    courseName: 'Exam',
                    courseId: "2"
                }),
                courses: ko.observableArray(_idpCourses2View)
            },
            {
                coursesCol: new corecourse({
                    courseName: 'None-CoreCourses',
                    courseId: "3"
                }),
                courses: ko.observableArray(_idpCourses3View)
            }]);
    var _planFooter = ko.observableArray(timestamps);

    function idp(parameters) {
        var self = this;
        self.disableClickCell = ko.observable(false);
        self.planHead = _tableHead;
        self.planDetail = _planDetail;
        self.planFooter = _planFooter;
        self.clickCell = function (data, e) {
            if (self.disableClickCell()) {
                return false;
            }
            else {
                var $this = $(e.target);
                console.log('click cell');
                var activitytypes = data.activitytypeArray();
                if (activitytypes.length == 1) {
                    data.activitytype(activitytypes[0]);
                }
                data.showWidget(true);
                console.log($this.parents("td").find("textarea").length);
                $this.parents("td").find("textarea").focus();
            }
        },
            self.onWidgetBlur = function (data, e) {
                //var $this = $(e.target);
                console.log('focusout');
                data.showWidget(false);
                data.isSaving(true);
                self.disableClickCell(true);
                console.log('close');
                //simulate saving
                setTimeout(function() {
                    self.disableClickCell(false);
                }, 500);

            };
    }
    return idp;

});
