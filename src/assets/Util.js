import dayjs from "dayjs";

export default {
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
    formatDate(date) {
        date = dayjs(date);
        let _month = date.month() + 1;
        let _day = date.date();
        let _year = dayjs().year();
        return `${_year}-${_month <= 9 ? "0" + _month : _month}-${_day <= 9 ? "0" + _day : _day}`;
    },
};