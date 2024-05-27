export const getCategories = (data) => {
	let fetchPromises = data.map(element => {
		return fetch(`/api/portal/getCategories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				categoryId: element["_category id"],
			})
		})
		.then(response => response.json())
		.then(({ data }) => {
  
		  delete data["@odata.editLink"];
		  delete data["@odata.id"];
		  delete element["@odata.editLink"];
		  delete element["@odata.id"];
  
		  return {
			...element,
			categoryData: data
		  }
		})
		.catch(error => {
			console.log(error);
			return null; // handle error gracefully
		});
	});
  
	return Promise.all(fetchPromises)
		.then(items => {
			// console.log(items); // check the fetched items
			return items.filter(item => item !== null); // remove null items if needed
		});
  }