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
        return date.format("YYYY-MM-DD")
    },
    formatTime(time) {
        time = dayjs(time);
        return time.format("HH:mm:ss");
    },
    formatDatetime(datetime) {
        datetime = dayjs(datetime);
        return datetime.format("YYYY-MM-DD HH:mm:ss");
    },
    getIsoWeekDay(date) {
        date = dayjs(date);
        let day = date.day();
        return day === 0 ? 7 : day;
    },
};