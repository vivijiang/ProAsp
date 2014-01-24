define(["./corecourse", "./idpcourse", "knockout-2.3.0"], function (corecourse, idpcourse, ko) {
    console.log("idp->" + corecourse);
    //new corecourse({ courseName: 'Parents Academy', courseId: "3" }),
    //new corecourse({ courseName: 'Progress Update', courseId: "4" }),
    //new corecourse({ courseName: 'Parent-Teacher Meetings', courseId: "5" })

    var timestamps = [{
        monthText: 'Sept',
        monthId: '9',
        year: '13'
    }, {
        monthText: 'Oct',
        monthId: '10',
        year: '13'
    }, {
        monthText: 'Nov',
        monthId: '11',
        year: '13'
    }, {
        monthText: 'Dec',
        monthId: '12',
        year: '13'
    }, {
        monthText: 'Jan',
        monthId: '1',
        year: '14'
    }, {
        monthText: 'Feb',
        monthId: '2',
        year: '14'
    }, {
        monthText: 'Mar',
        monthId: '3',
        year: '14'
    }, {
        monthText: 'Apr',
        monthId: '4',
        year: '14'
    }, {
        monthText: 'May',
        monthId: '5',
        year: '14'
    }, {
        monthText: 'Jun',
        monthId: '6',
        year: '14'
    }, {
        monthText: 'July',
        monthId: '7',
        year: '14'
    }, {
        monthText: 'Aug',
        monthId: '8',
        year: '14'
    }];


    function getIdpCourseViewModel(timestamps, _idpCourses1) {
        var idpCourse1View = [];
        var index = timestamps.length;
        var len = index;
        for (; index; index--) {
            var currenttimestamp = timestamps[len - index];
            var currentidpcourse = _idpCourses1[0];
            if (_idpCourses1.length && currenttimestamp.monthId == currentidpcourse.monthId()) {
                idpCourse1View.push(currentidpcourse);
                _idpCourses1.shift();
            } else {
                idpCourse1View.push(new idpcourse({
                    monthId: currenttimestamp.monthId
                }));
            }
        }
        return idpCourse1View;
    }

    var _idpCourses1 = [
        new idpcourse({
            monthId: '9',
            courseId: "1",
            activitytype: "1",
            description: 'blabla'

        }),
        new idpcourse({
            monthId: '12',
            courseId: "1",
            activitytype: "2",
            description: 'test description'
        })

    ];

    var _idpCourse1View = getIdpCourseViewModel(timestamps, _idpCourses1);


    var _idpCourses2 = [
    new idpcourse({
        monthId: '10',
        courseId: "2",
        activitytype: "2",
        description: 'blablabla'
    }),
    new idpcourse({
        monthId: '2',
        courseId: "2",
        activitytype: "3",
        description: 'test'
    })

    ];

    var _idpCourses2View = getIdpCourseViewModel(timestamps, _idpCourses2);


    var _planDetail = ko.observableArray(
        [{
            coursesCol: new corecourse({
                courseName: 'Life Club and Exams',
                courseId: "1"
            }),
            courses: ko.observableArray(_idpCourse1View)
        }, {
            coursesCol: new corecourse({
                courseName: 'None-CoreCourses',
                courseId: "2"
            }),
            courses: ko.observableArray(_idpCourses2View)
        }]);
    var _planFooter = ko.observableArray(timestamps);

    var _legend = [
        new idpcourse({
            courseId: "1",
            activitytype: "1",
        }),
      new idpcourse({
          courseId: "1",
          activitytype: "2",
      }),
          new idpcourse({
              courseId: "2",
              activitytype: "2",
          }),
          new idpcourse({
              courseId: "2",
              activitytype: "3",
          })];
    var plan = {
        legend: _legend,
        planDetail: _planDetail,
        planFooter: _planFooter
    };
    test = plan;
    return plan;

});
