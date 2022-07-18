export const fetchMap = (lat, lng, page) =>
	fetch(
		`https://api.openbrewerydb.org/breweries?by_dist=${lat},${lng}&per_page=50&page=${page}`
	).then((response) => response.json());
