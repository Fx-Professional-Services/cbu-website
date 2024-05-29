export const getCategories = async (data) => {
	try {
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
			
				if(element["@odata.editLink"] !== null && element["@odata.id"] !== null){
					delete element["@odata.editLink"];
					delete element["@odata.id"];
				}
	
				delete data["@odata.editLink"];
				delete data["@odata.id"];
	
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
	  
		return await Promise.all(fetchPromises)
			.then(items => {
				// console.log(items); // check the fetched items
				return items.filter(item => item !== null); // remove null items if needed
			});

	} catch(error){
		console.log(error)
	}
  }