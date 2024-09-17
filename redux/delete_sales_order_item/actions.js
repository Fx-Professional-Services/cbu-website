import { DELETE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, DELETE_SALES_ORDER_ITEM_FETCH_DATA_START, DELETE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}
export const deleteSalesOrderItem = (salesOrderItemId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_SALES_ORDER_ITEM_FETCH_DATA_START });

        await fetch(`/api/portal/deleteSalesOrderItem`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						salesOrderItemId: salesOrderItemId
					})
				})
					.then((response) => response.json())
					.then(({data}) => {
						
						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: DELETE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
								payload: data
							});
						} else {
							dispatch({ 
								type: DELETE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
								payload: data
							});
						}
					})
					.catch((error) =>  dispatch({ type: DELETE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE }));
    };
};