export const getItems = (data) => {
    try {
        let fetchPromises = data.map(element => {
            return fetch(`/api/portal/getItem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemId: element["_item id"],
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
                delete data["@odata.context"];
                return {
                    ...element,
                    itemData: data
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
        
    } catch(error) {
        console.log(error)
    }
}