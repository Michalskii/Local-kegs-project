import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Map from '../views/Map.vue';
import Search from '../views/Search.vue';
import Profile from '../views/Profile.vue';
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter);

const routes = [
	{
		path: '/home',
		name: 'home',
		component: HomeView,
	},

	{
		path: '/map',
		name: 'map',
		component: Map,
	},
	{
		path: '/search',
		name: 'search',
		component: Search,
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
		beforeEnter: authGuard,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
