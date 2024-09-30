import { CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_START, CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

export const checkIfExistSalesOrderItem = (itemId, parentSalesOrderItemId) => {
    return async (dispatch) => {
        dispatch({ type: CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_START });

		try {
			const response = await fetch(`/api/portal/getSalesOrderItem`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemId: itemId,
					parentSalesOrderItemId: parentSalesOrderItemId,
					field:"checkIfExists"
					})
				})
				const { data } = await response.json();
				let value;
				if(data?.value?.length != 0) {
					if(data.value.length > 1) {
						value = {error: "Duplicated item!"}
					} else {
						value = data.value[0];
					}
				} else {
					value = false;
				}
				
				dispatch({ 
					type: CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
					payload: value
				});

				return value;

			}
			catch (error) {
				dispatch({ type: CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_FAILURE })
				console.log(error)
			}
	}
};