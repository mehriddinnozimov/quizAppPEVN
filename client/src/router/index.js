import { createWebHistory, createRouter } from "vue-router";

import HomePage from '../pages/Home.vue'
import TestPage from '../pages/Test.vue'
import AboutPage from '../pages/About.vue'
import ProfilePage from '../pages/Profile.vue'
import TestCreatePage from '../pages/TestCreate.vue'
import TestUpdatePage from '../pages/TestUpdate.vue'
import TestViewPage from '../pages/TestView.vue'
import UserViewPage from '../pages/UserViewPage.vue'

const routes = [
	{	
		path: '/',
		name: 'Home',
		component: HomePage
	},
	{
		path: '/tests',
		name: 'Tests',
		component: TestPage
	},
	{
		path: '/about',
		name: 'About',
		component: AboutPage
	},
	{
		path: '/profile',
		name: 'Profile',
		component: ProfilePage
	},
	{
		path: '/tests/create',
		name: 'TestCreate',
		component: TestCreatePage
	},
	{
		path: '/tests/:testId',
		name: 'TestView',
		component: TestViewPage
	},
	{
		path: '/tests/:testId/update',
		name: 'TestUpdate',
		component: TestUpdatePage
	},
	{
		path: '/users/:userId',
		name: 'UserView',
		component: UserViewPage
	}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router