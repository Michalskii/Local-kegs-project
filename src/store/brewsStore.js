import { brewsFetch } from '@/services/brewsService';

function getFilteredMapItems(data) {
	return data.filter((brew) => brew.latitude !== '' && brew.longitude !== '');
}
function getParsedMapObjects(arr1, arr2) {
	const mergedArray = [...arr1, ...arr2];
	return [
		...mergedArray
			.reduce((map, obj) => map.set(obj.name, obj), new Map())
			.values(),
	];
}
export default {
	namespaced: true,
	state: () => ({
		brews: [],
		fetchedMapItems: [],
		filteredMapItems: [],
	}),
	actions: {
		// fetchBrews({ commit }) {
		// 	brewsFetch()
		// 		.then((response) => response.json())
		// 		.then((data) => commit('updateBrews', data));
		// },

		fetchMapItems({ commit }, payload) {
			let a = payload.a;
			let b = payload.b;
			let c = payload.c;
			fetch(
				`https://api.openbrewerydb.org/breweries?by_dist=${a},${b}&per_page=50&page=${c}`
			)
				.then((response) => response.json())
				.then((data) => commit('pushFetchedMapItems', data));
		},
		clear({ commit }) {
			commit('CLEAR');
		},
	},

	mutations: {
		updateBrews(state, data) {
			state.brews = data.filter((brew) => brew.latitude !== '');
		},
		// filterBrews(state, data) {
		// 	state.filteredMapItems = data.filter((brew) => brew.latitude !== '');
		// },
		CLEAR(state) {
			state.fetchedMapItems = [];
		},

		pushFetchedMapItems(state, data) {
			let filteredMapItems = getFilteredMapItems(data);

			state.fetchedMapItems = getParsedMapObjects(
				state.fetchedMapItems,
				filteredMapItems
			);
			// console.log(state.fetchedMapItems);

			// console.log(state.fetchedMapItems);
		},
	},
};
