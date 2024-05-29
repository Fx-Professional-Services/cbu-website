export const getCategoryItems = async (itemId) => {
	try {
		const response = await fetch(`/api/portal/getCategoryItems`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: itemId,
			})
		});
		const { data } = await response.json();
		// console.log("getcatitem", data)
		return data
	} catch (error) {
		dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_FAILURE });
		console.log(error);
	}
};
