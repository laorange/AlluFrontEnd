export default {
    advancedApiClassroom(weeks, what_days, which_lessons) {
        return `https://siae.top/course/advanced/api/classroom/?limit=100&week=${weeks.join(",")}&what_day=${what_days.join(",")}&which_lesson=${which_lessons.join(",")}`;
    },
    // 学期信息查询
    semesterConfig() {
        return "https://siae.top/course/api/SemesterConfig/";
    },
    getApi() {
        return {
            "Classroom": "http://127.0.0.1:8000/course/api/Classroom/",
            "Classroom2d": "http://127.0.0.1:8000/course/api/Classroom2d/",
            "Course": "http://127.0.0.1:8000/course/api/Course/",
            "Course2d": "http://127.0.0.1:8000/course/api/Course2d/",
            "CourseChangeLog": "http://127.0.0.1:8000/course/api/CourseChangeLog/",
            "CourseForPost": "http://127.0.0.1:8000/course/api/CourseForPost/",
            "CourseInfo": "http://127.0.0.1:8000/course/api/CourseInfo/",
            "CourseInfo2d": "http://127.0.0.1:8000/course/api/CourseInfo2d/",
            "CourseInfo3d": "http://127.0.0.1:8000/course/api/CourseInfo3d/",
            "CoursePlan": "http://127.0.0.1:8000/course/api/CoursePlan/",
            "CoursePlan2d": "http://127.0.0.1:8000/course/api/CoursePlan2d/",
            "CourseType": "http://127.0.0.1:8000/course/api/CourseType/",
            "Group": "http://127.0.0.1:8000/course/api/Group/",
            "Group2d": "http://127.0.0.1:8000/course/api/Group2d/",
            "Notice": "http://127.0.0.1:8000/course/api/Notice/",
            "SemesterConfig": "http://127.0.0.1:8000/course/api/SemesterConfig/",
            "Teacher": "http://127.0.0.1:8000/course/api/Teacher/",
        };
    },
    courseForPost() {
        return `https://siae.top/course/api/CourseForPost/`;
    },
    courseInfoChangePage(info_id) {
        return `https://siae.top/admin/course/courseinfo/${info_id}/change/`;
    },
    coursePlanAddPage(info_id, method = "Course") {
        return `https://siae.top/admin/course/courseplan/add/?info=${info_id}&method=${method}`;
    },
};