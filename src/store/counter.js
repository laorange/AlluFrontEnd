// stores/counter.js
import {defineStore} from "pinia";
import axios from "axios";
import getUrl from "../assets/urls";

export const useCounterStore = defineStore("counter", {
    state: () => {
        return {
            isLoading: false,
            period: undefined,
            semester: undefined,
            date: new Date(),
            groups: [],
            semesterConfig: {
                "current_period": 30,
                "current_period_display": "2022.02~2022.07",
                "week1_monday_date": "2022-02-28 00:00:00",
                "max_week": 20,
            },
            apiData: {
                Group: [],
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
            this.axiosGet(getUrl.getApi().SemesterConfig, undefined, (response) => {
                if (response.data.count) {
                    this.semesterConfig = response.data.results[0];
                    console.log("this.semesterConfig.current_period", this.semesterConfig.current_period);
                    this.period = parseInt(localStorage.getItem("period")) || this.semesterConfig.current_period;
                    this.semester = parseInt(localStorage.getItem("semester")) || (2 - this.semesterConfig.current_period % 2);
                    this.groups = JSON.parse(localStorage.getItem("groups")) || [];
                    localStorage.setItem("period", this.period);
                    localStorage.setItem("semester", this.semester);
                    localStorage.setItem("groups", JSON.stringify(this.groups));
                    this.axiosGetDataFromApi("Course");
                }
            });
        },
        getGroupsName(groups) {
            let _groupsName = "";
            if (groups && groups.length !== 0) {
                let _groupsList = [];
                for (let _group of groups) {
                    _groupsList.push(_group.name);
                }
                _groupsName = _groupsList.join("&");
            }
            return _groupsName;
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
                        url += `${parametersKey}=${valueElement}&`;
                    }
                } else {
                    url += `${parametersKey}=${_value}&`;
                }
            }
            console.log("url", url);
            axios.get(url).then(
                response => {
                    handler(response);
                    console.log(url, response.data);
                    this.isLoading = false;
                },
                error => {
                    console.warn(error.message);
                    this.isLoading = false;
                },
            );
        },
        axiosGetDataFromApi(apiName, parameters = {}) {
            parameters["limit"] = 1;
            this.axiosGet(getUrl.getApi()[apiName], parameters, (response) => {
                parameters["limit"] = response.data.count;
                this.axiosGet(getUrl.getApi()[apiName], parameters, (response) => {
                    this.apiData[apiName] = response.data.results;
                });
            });
        },
        myReset() {
            this.$reset();
            this.onMountedHook();
        },
    },
});
