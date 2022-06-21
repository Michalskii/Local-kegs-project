import { brewsFetch } from '@/services/brewsService';

function getFilteredMapItems(data) {
	return data.filter((brew) => brew.latitude !== '');
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
		fetchedMapItems: [],
		lastFetched: [],
	}),
	actions: {
		// fetchBrews({ commit }) {
		// 	brewsFetch()
		// 		.then((response) => response.json())
		// 		.then((data) => commit('updateBrews', data));
		// },

		async fetchMapItems({ commit }, payload) {
			let a = payload.a;
			let b = payload.b;
			let c = payload.c;

			const fetchedItems = await fetch(
				`https://api.openbrewerydb.org/breweries?by_dist=${a},${b}&per_page=50&page=${c}`
			).then((response) => response.json());

			commit('pushFetchedMapItems', fetchedItems);

			return getFilteredMapItems(fetchedItems);
		},
	},

	mutations: {
		// updateBrews(state, data) {
		// 	state.brews = data.filter((brew) => brew.latitude !== '');
		// },
		// filterBrews(state, data) {
		// 	state.filteredMapItems = data.filter((brew) => brew.latitude !== '');
		// },

		pushFetchedMapItems(state, data) {
			state.lastFetched = getFilteredMapItems(data);
			state.fetchedMapItems = getParsedMapObjects(
				state.fetchedMapItems,
				state.lastFetched
			);
		},
	},
};
