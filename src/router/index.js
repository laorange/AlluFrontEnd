import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import Course from '../components/Course/Course.vue'
// import PDC from '../components/PDC/PDC.vue'
import Classroom from '../components/Classroom/Classroom.vue'
import Exam from '../components/Exam/Exam.vue'
import News from '../components/News/News.vue'

const routes = [{
		path: '/',
		component: Course
	},
	// {
	// 	path: '/:period(\\d+)/pdc',
	// 	component: PDC
	// },
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
