import { CREATE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, CREATE_SALES_ORDER_ITEM_FETCH_DATA_START, CREATE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}
export const createSalesOrderItem = (
	{
		creator,
		orderId,
		price,
		quantity,
		customerTierId,
		itemId,
		partyId,
		parentOrderItemId,
		configurationOptionItemId
	}
) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_SALES_ORDER_ITEM_FETCH_DATA_START });

		try {

			const response = await fetch(`/api/portal/createSalesOrderItem`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						creator,
						orderId,
						price,
						quantity,
						customerTierId,
						itemId,
						partyId,
						parentOrderItemId,
						configurationOptionItemId
					})
				})
				const { data } = await response.json();
				let item = await fetchItem(data["_item id"])
				// console.log(data)
				
				dispatch({ 
					type: CREATE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
					payload: {
						itemData: item,
						...data
					}
				});
			} 
			catch (error) {
				dispatch({ type: CREATE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE })
				console.log(error);
			}
    };
};

async function fetchItem (itemId) {
	let response = await fetch(`/api/portal/getItem`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			itemId:itemId
		})
	});

	let { data } = await response.json()

	return data;

}