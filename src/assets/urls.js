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
            "Classroom": "https://siae.top/course/api/Classroom/",
            "Classroom2d": "https://siae.top/course/api/Classroom2d/",
            "Course": "https://siae.top/course/api/Course/",
            "CourseChangeLog": "https://siae.top/course/api/CourseChangeLog/",
            "CourseForPost": "https://siae.top/course/api/CourseForPost/",
            "CourseInfo": "https://siae.top/course/api/CourseInfo/",
            "CourseInfo2d": "https://siae.top/course/api/CourseInfo2d/",
            "CourseInfo3d": "https://siae.top/course/api/CourseInfo3d/",
            "CoursePlan": "https://siae.top/course/api/CoursePlan/",
            "CoursePlan2d": "https://siae.top/course/api/CoursePlan2d/",
            "CourseType": "https://siae.top/course/api/CourseType/",
            "Group": "https://siae.top/course/api/Group/",
            "Group2d": "https://siae.top/course/api/Group2d/",
            "SemesterConfig": "https://siae.top/course/api/SemesterConfig/",
            "Teacher": "https://siae.top/course/api/Teacher/",
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