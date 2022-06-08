import { brewsFetch } from '@/services/brewsService';

export default {
	namespaced: true,
	state: () => ({
		brews: [],
	}),
	actions: {
		fetchBrews({ commit }) {
			brewsFetch()
				.then((response) => response.json())
				.then((data) => commit('updateBrews', data));
		},
	},

	mutations: {
		updateBrews(state, data) {
			state.brews = data.filter((brew) => brew.latitude !== '');
		},
	},
};
