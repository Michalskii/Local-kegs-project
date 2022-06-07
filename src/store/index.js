import Vue from 'vue';
import Vuex from 'vuex';

import brewsStore from '../store/brewsStore';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		brewsStore,
	},

	state: () => ({}),
	actions: {},
	mutations: {
		initialiseStore(state) {
			if (localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
	},
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});
