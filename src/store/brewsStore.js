import { brewsFetch } from '@/services/brewsService';
import { map } from 'core-js/core/array';
import 'core-js/es/array';

export default {
	namespaced: true,
	state: () => ({
		brews: [],
		fetchedMapItems: [],
	}),
	actions: {
		// fetchBrews({ commit }) {
		// 	brewsFetch()
		// 		.then((response) => response.json())
		// 		.then((data) => commit('updateBrews', data));
		// },

		fetchMapItems({ commit }, mapCenter) {
			fetch(
				`https://api.openbrewerydb.org/breweries?by_dist=${mapCenter.lat},${mapCenter.lng}&per_page=50`
			)
				.then((response) => response.json())
				.then((data) => commit('pushFetchedMapItems', data));
		},
	},

	mutations: {
		updateBrews(state, data) {
			state.brews = data.filter((brew) => brew.latitude !== '');
		},

		pushFetchedMapItems(state, data) {
			let filteredMapItems = data.filter((brew) => brew.latitude !== '');

			let mergedArray = [...state.fetchedMapItems, ...filteredMapItems];
			// let uni = [...mergedArray.reduce((map, obj)) => map.set(obj.name, obj), new Map().values];
			const uniqueData = [
				...mergedArray
					.reduce((map, obj) => map.set(obj.name, obj), new Map())
					.values(),
			];

			// console.log(filteredMapItems);
			// state.fetchedMapItems.push(filteredMapItems);
			// console.log(state.fetchedMapItems);

			// let newarr = state.fetchedMapItems.concat(
			// 	filteredMapItems.filter(
			// 		(item) => state.fetchedMapItems.indexOf(item) < 0
			// 	)
			// );
			// Array.prototype.push.apply(state.fetchedMapItems, filteredMapItems);
			// var myFinalArray = [
			// 	...new Set([...state.fetchedMapItems, ...filteredMapItems]),
			// ];
			// console.log(myFinalArray);

			console.log(uniqueData);
			//
			// let fetchedBrews = data.filter((brew) => brew.latitude !== '');
			// state.brews.push(fetchedBrews);
			// console.log(state.brews);
		},
	},
};
