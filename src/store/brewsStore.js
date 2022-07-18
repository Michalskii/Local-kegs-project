import { userFavs } from '../services/userFavs.js';
import axios from 'axios';
const token =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZISGloZElZR2x5Ql8yWWd0Ui15RCJ9.eyJpc3MiOiJodHRwczovL2Rldi1jbDhwams3My5ldS5hdXRoMC5jb20vIiwic3ViIjoib1JDVFNySDFHVFlCUGVUQjJqYUdjRjViUWpIRElQZmlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWNsOHBqazczLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU2MDY3Mzc0LCJleHAiOjE2NTg2NTkzNzQsImF6cCI6Im9SQ1RTckgxR1RZQlBlVEIyamFHY0Y1YlFqSERJUGZpIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.CYeGz64Tp1AFYtIy-EtpbNgn1XYzqPNQkqb-K4a68tZT0q2Or1V8u8F_-ZkBe609crFrMURUMjyZ5uAKULrpkwt4CMqwqgSBY2opo-03na-O2DxKtGRCTMaLpBtjjjBhw7xv82PXOh-xfwI6-R6B-JV1tn8IarE6OLpwjuthY8SVjFFWT1asnd5PhIqIBFzpZ4fHkOGBIkgg6xZ_5N0Zi5wE0FXjVv6v4wCJQYB0VooAYUA4Qy8AOqDPgHCybixYEKRGsQ6wmA5Ih6lBihq9vKQfqoMmpZF6WGS0SsKllQ93zWIiq0SQgZ_DBbDTIkj_vAjhIpUl0CmEodUEeCL09g';

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
		userFavs: [],
	}),
	actions: {
		fetchUserFavs({ commit }, userId) {
			userFavs(userId)
				.then((response) => response.json())
				.then((data) => commit('updateStore', data.user_metadata.favourites));
		},

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

		addNewFav({ commit, state }, brewery) {
			console.log(state.userFavs);
			if (!state.userFavs.some((e) => e.id === brewery.id)) {
				console.log('brewery added');
				let arr = state.userFavs;
				arr.push(brewery);
				commit('updateStore', arr);
			}
		},

		deleteFavItem({ commit, state }, deletedItem) {
			let data = state.userFavs.filter((brewery) => brewery.id !== deletedItem);
			commit('updateStore', data);
		},

		// addNewFav({ commit}, brewery) {

		// 	commit('pushFav', brewery);
		// },

		// deleteFavItem({ commit }, deletedItem) {
		// 	commit('delete', deletedItem);
		// },
		patchFavList({ commit }, userId) {
			commit('sendPatchRequest', userId);
		},
	},

	mutations: {
		pushFetchedMapItems(state, data) {
			state.lastFetched = getFilteredMapItems(data);
			state.fetchedMapItems = getParsedMapObjects(
				state.fetchedMapItems,
				state.lastFetched
			);
		},
		updateStore(state, data) {
			state.userFavs = data;
		},
		// pushFav(state, brewery) {
		// 	if (!state.userFavs.includes(brewery)) {
		// 		state.userFavs.push(brewery);
		// 	}
		// },

		// updateUserFavs(state, data) {
		// 	state.userFavs = data.user_metadata.favourites;
		// 	console.log(data.user_metadata.favourites);
		// 	console.log(state.userFavs);
		// },
		// delete(state, deletedItem) {
		// 	state.userFavs = state.userFavs.filter(
		// 		(brewery) => brewery.id !== deletedItem
		// 	);
		// },
		async sendPatchRequest(state, userId) {
			const api_url = `https://dev-cl8pjk73.eu.auth0.com/api/v2/users/auth0%7C${userId}`;
			const response = await axios.patch(
				api_url,

				{
					user_metadata: {
						favourites: state.userFavs,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
	},
};
