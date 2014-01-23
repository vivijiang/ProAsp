define(["../knockout-2.3.0"], function (ko) {
    return function (data) {
        this.courseName = data.courseName || "";
        this.courseId = data.courseId;
    };
}
  )
