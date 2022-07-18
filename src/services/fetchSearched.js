export const fetchSearched = (search) =>
	// fetch(
	//     `https://api.openbrewerydb.org/breweries/search?query=${search}`
	//   )
	//     .then((response) => response.json())
	//     .then((data) => (this.searchResults = data));

	fetch(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
		.then((response) => response.json())
		.then((data) => {
			return data;
		});
