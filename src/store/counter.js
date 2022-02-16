// stores/counter.js
import {defineStore} from "pinia";
import axios from "axios";
import getUrl from "../assets/urls";
import Util from "../assets/Util";
import dayjs from "dayjs";

export const useCounterStore = defineStore("counter", {
    state: () => {
        return {
            isLoading: false,
            period: undefined,
            semester: undefined,
            date: dayjs(new Date()),
            groups: [],
            semesterConfig: {
                "current_period": 30,
                "current_period_display": "2022.02~2022.07",
                "week1_monday_date": "2022-02-28 00:00:00",
                "max_week": 20,
            },
            apiData: {
                Group: [],
                Course: [],
                CourseChangeLog: [],
            },
        };
    },
    getters: {
        // AddCourseDialogTitle(state) {
        //     if (state.AddCourseDialogData.plan && state.AddCourseDialogData.plan_id) {
        //         let plan = state.AddCourseDialogData.plan;
        //         console.log(plan);
        //         let groups = "";
        //         if (plan.groups && plan.groups.length !== 0) {
        //             let _groups = [];
        //             for (let _group of plan.groups) {
        //                 _groups.push(_group.name);
        //             }
        //             groups = _groups.join("&");
        //         }
        //         return `${plan.info.ch_name}-${plan.method}-${plan.teacher.name}-${groups}`;
        //     } else {
        //         return "教学计划";
        //     }
        // },
    },
    actions: {
        onMountedHook() {
            this.axiosGetWithThrottle(getUrl.getApi().SemesterConfig + "1/", undefined, (response) => {
                this.semesterConfig = response.data;
                this.period = parseInt(localStorage.getItem("period")) || this.semesterConfig.current_period;
                this.semester = parseInt(localStorage.getItem("semester")) || (2 - this.semesterConfig.current_period % 2);
                this.groups = JSON.parse(localStorage.getItem("groups")) || [];
                localStorage.setItem("period", this.period);
                localStorage.setItem("semester", this.semester);
                localStorage.setItem("groups", JSON.stringify(this.groups));
                this.axiosGetDataFromApi("Classroom");
                this.axiosGetDataFromApi("Group");
                this.axiosGetDataFromApi("CourseChangeLog", {
                    after: Util.formatDate(new Date((new Date()) - 259200000)), limit: 20,
                });
                this.axiosGetRecentCourse();
            });
        },
        axiosGet(url, parameters = {}, handler = () => {
            return undefined;
        }) {
            this.isLoading = true;
            for (const parametersKey in parameters) {
                let _value = parameters[parametersKey];
                if (url.indexOf("?") === -1) {
                    url += "?";
                }
                if (Array.isArray(_value)) {
                    for (const valueElement of _value) {
                        if (_value) {
                            url += `${parametersKey}=${valueElement}&`;
                        }
                    }
                } else {
                    if (_value) {
                        url += `${parametersKey}=${_value}&`;
                    }
                }
            }
            console.log("url", url);
            axios.get(url).then(
                response => {
                    handler(response);
                    // console.log(url, response.data);
                    this.isLoading = false;
                },
                error => {
                    console.warn(error.message);
                    this.isLoading = false;
                },
            );
        },
        axiosGetWithThrottle(url, parameters, handler) {
            if (this.isLoading) {
                setTimeout(() => {
                    this.axiosGetWithThrottle(url, parameters, handler);
                    // console.log("有别处发起了请求，请排队");
                }, 250);
            } else {
                this.axiosGet(url, parameters, handler);
            }
        },
        axiosGetDataFromApi(apiName, parameters = {}) {
            let getAgain = !parameters.limit;
            if (getAgain) {
                parameters["limit"] = 1;
            }
            this.axiosGetWithThrottle(getUrl.getApi()[apiName], parameters, (response) => {
                parameters["limit"] = response.data.count;
                if (getAgain) {
                    this.axiosGetWithThrottle(getUrl.getApi()[apiName], parameters, (response) => {
                        this.apiData[apiName] = response.data.results;
                    });
                } else {
                    this.apiData[apiName] = response.data.results;
                }
            });
        },
        axiosGetRecentCourse() {
            this.axiosGetDataFromApi("Course", {
                period: this.period,
                // after: Util.formatDate(dayjs(this.date).add(-7, "day")),
                // before: Util.formatDate(dayjs(this.date).add(7, "day")),
            });
        },
        filterCourseByDate(date) {
            return this.apiData.Course.filter((course) => {
                let _a = dayjs(course.date);
                let _b = dayjs(date);
                if (!_a.isSame(_b, "day")) {
                    return false;
                }
                if (this.semester >= 15) {
                    this.groups = [];
                    return true;
                } else if (course.semester && course.semester !== this.semester) {
                    console.log(course.semester, this.semester);
                    return false;
                }
                let groupIds = JSON.parse(course.group_ids);
                return !this.groups.length || this.groups.filter(group => groupIds.indexOf(group.group_id) > -1).length;
            });
        },
        myReset() {
            this.$reset();
            this.onMountedHook();
        },
    },
});
