//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
import axios from "axios";
//引用Vuex
Vue.use(Vuex);

const actions = {
    //响应组件中加的动作

};

const mutations = {
    //执行加
    GET_INFO_FROM_API(state, value) {
        console.log("开始请求API");
        state.updating = true;
        axios.get("https://siae.top/course/api/" + value.url).then(
            response => {
                console.log("请求成功了");
                Object.assign(state[value.parName], response.data);
                console.log("请求API", response.data);
                if (response.data.next) {
                    this.GET_INFO_FROM_API(state, value.url, value.parName);
                }
                state.updating = false;
            },
            error => {
                console.warn(error.message);
                state.updating = false;
            },
        );
    },
};

//初始化数据
const state = {
    updating: false,
    SemesterConfig: {},
};

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
});
