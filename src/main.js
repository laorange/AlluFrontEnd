import {createApp} from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import "@vant/touch-emulator";

import router from "./router/";
import {createPinia} from "pinia";

// import {Notify} from "vant";
// app.use(Notify);

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);

// app.use(ElementPlus, {
//     locale: zhCn,
// });

app.use(Vant);
app.use(router);
app.use(createPinia());
app.mount("#app");
