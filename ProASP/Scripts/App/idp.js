define(["./corecourse", "./idpcourse", "knockout-2.3.0", "jquery"], function (corecourse, idpcourse, ko, $) {
    console.log("idp->" + corecourse);

    function _getIdpCourseViewModel(timestamps, _idpCourses1, courseId, activityArray) {
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
                    courseId: courseId,
                    activitytypeArray: activityArray
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
            courseName: "NTB book5", //ntb book5 -- NTBb1.1.1
            courseId: "ntb_5",
            startMonthId: 9,
            monthSpan: 4
        }, {
            courseName: "NTB book6", //ntb book5 -- NTBb1.1.1
            courseId: "ntb_6",
            startMonthId: 1,
            monthSpan: 5
        }, {
            courseName: "NTB book7", //ntb book7 -- NTBb1.1.1
            courseId: "ntb_6",
            startMonthId: 6,
            monthSpan: 1
        }, {
            courseName: "", //exams
            courseId: null,
            startMonthId: 7,
            monthSpan: 2
        }]

    };


    var activityArray1 = [{
        activityName: "Life Club",
        activityId: "1"
    }];
    var _idpCourses1 = [
        new idpcourse({
            date: new PlanDate(new Date("2013/9")),
            courseId: "1",
            activitytype: "1",
            description: 'blabla',
            activitytypeArray: activityArray1

        }),
        new idpcourse({
            date: new PlanDate(new Date("2013/12")),
            courseId: "1",
            activitytype: "1",
            description: 'test description',
            activitytypeArray: activityArray1

        })

    ];

    var _idpCourse1View = _getIdpCourseViewModel(timestamps, _idpCourses1, 1, activityArray1);

    var activityArray2 = [{
        activityName: "Phone update",
        activityId: "1"
    }, {
        activityName: "Progress Update",
        activityId: "2"
    }, {
        activityName: "Phone update",
        activityId: "3"
    }, {
        activityName: "Email update",
        activityId: "4"
    }, {
        activityName: "Open Doors",
        activityId: "5"
    }, {
        activityName: "Achievement Ceremony",
        activityId: "6"
    }];

    var _idpCourses2 = [
        new idpcourse({
            date: new PlanDate(new Date("2013/10")),
            courseId: "2",
            activitytype: "2",
            description: 'blablabla',
            activitytypeArray: activityArray2
        }),
        new idpcourse({
            date: new PlanDate(new Date("2014/02")),
            courseId: "2",
            activitytype: "1",
            description: 'test',
            activitytypeArray: activityArray2

        })

    ];


    var _idpCourses2View = _getIdpCourseViewModel(timestamps, _idpCourses2, 2, activityArray2);

    var activityArray3 = [{
        activityName: "Life Club",
        activityId: "1"
    }];
    var _idpCourses3 = [
        new idpcourse({
            date: new PlanDate(new Date("2013/11")),
            courseId: "3",
            activitytype: "1",
            description: 'blablabla',
            activitytypeArray: activityArray3

        }),
        new idpcourse({
            date: new PlanDate(new Date("2014/04")),
            courseId: "3",
            activitytype: "2",
            description: 'test',
            activitytypeArray: activityArray3

        })
    ];

    var _idpCourses3View = _getIdpCourseViewModel(timestamps, _idpCourses3, 3, activityArray3);


    var _planDetail = ko.observableArray(
        [{
            coursesCol: new corecourse({
                courseName: 'Life Club',
                courseId: "1"

            }),
            courses: ko.observableArray(_idpCourse1View),

        }, {
            coursesCol: new corecourse({
                courseName: 'Exam',
                courseId: "2"
            }),
            courses: ko.observableArray(_idpCourses2View)
        }, {
            coursesCol: new corecourse({
                courseName: 'None-CoreCourses',
                courseId: "3"
            }),
            courses: ko.observableArray(_idpCourses3View)
        }]);
    var _planFooter = ko.observableArray(timestamps);


    var $blur, $click;

    $(document).mousedown(function (e) {
        $click = $(e.target);
    });
    $(document).mouseup(function (e) {
        var $this = $(e.target);
        if (!($this.attr('class') == 'idp-widget' || $this.parents(".idp-widget").length)) {
            $click = null;
        }
    });
    $(document).click(function (e) {
        $blur = null;
    });

    function idp(parameters) {
        var self = this;
        self.planHead = _tableHead;
        self.planDetail = _planDetail;
        self.planFooter = _planFooter;
        self.clickCell = function (data, e) {
            // prevent click cell if it's triggered by blur widget
            if ($blur && ($blur.attr('class') == 'idp-widget' || $blur.parents(".idp-widget").length)) {
                return false;
            } else {
                var $this = $(e.target);
                console.log('click cell');
                if (!data.activitytype()) {
                    var activitytypes = data.activitytypeArray();
                    if (activitytypes.length == 1) {
                        data.activitytype(activitytypes[0].activityId);
                    } else {
                        data.activitytype('unconfirmed');
                    }
                }
                data.showWidget(true);
                console.log($this.parents("td").find("textarea").length);
                $this.parents("td").find(".idp-widget textarea").focus();
            }
        };
        self.onWidgetBlur = function (data, e) {
            console.log('focusout' + $click);
            //prevent blur handler if it's triggered by elements in widget.
            if ($click && ($click.attr('class') == 'idp-widget' || $click.parents(".idp-widget").length)) {
                return false;
            }
            $blur = $(e.target);
            if (data.activitytype() == 'unconfirmed') {
                data.activitytype(undefined);
            }
            data.showWidget(false);
            data.isSaving(true);
        };


    }
    return idp;

});
