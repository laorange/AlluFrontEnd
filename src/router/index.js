import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import Course from '../components/Course.vue'
import PDC from '../components/PDC.vue'
import Classroom from '../components/Classroom.vue'
import Exam from '../components/Exam.vue'
import News from '../components/News.vue'

const routes = [{
		path: '/',
		component: Course
	},
	{
		path: '/pdc',
		component: PDC
	},
	{
		path: '/classroom',
		component: Classroom
	},
	{
		path: '/exam',
		component: Exam
	},
	{
		path: '/news',
		component: News
	},
]

export default createRouter({
	history: createWebHashHistory(),
	routes,
})
