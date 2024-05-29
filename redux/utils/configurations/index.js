export const getConfigurationOptions = async (itemId) => {
	try {
		const response = await fetch(`/api/portal/getConfiguratorOptions`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  id: itemId,
			})
		});
		const { data } = await response.json();
	  
		return data;
	  } catch (error) {
		  console.log(error);
	  }

	
	// let fetchConfurato = data.map(element => {
	// 	return fetch(`/api/portal/getConfiguratorOptions`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			id: itemId
	// 		})
	// 	})
	// 	.then(response => response.json())
	// 	.then(({ data }) => {
	// 		if(element["@odata.editLink"] !== null && element["@odata.id"] !== null){
	// 			delete element["@odata.editLink"];
	// 			delete element["@odata.id"];
	// 		}

	// 		delete data["@odata.editLink"];
	// 		delete data["@odata.id"];
  
	// 		return {
	// 			...element,
	// 			categoryData: data
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 		return null; // handle error gracefully
	// 	});
	// });
  
	// return Promise.all(fetchPromises)
	// 	.then(items => {
	// 		// console.log(items); // check the fetched items
	// 		return items.filter(item => item !== null); // remove null items if needed
	// 	});

} 