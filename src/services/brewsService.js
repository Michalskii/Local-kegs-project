export const brewsFetch = () =>
	fetch(
		'https://raw.githubusercontent.com/openbrewerydb/openbrewerydb/master/breweries.json'
	);
