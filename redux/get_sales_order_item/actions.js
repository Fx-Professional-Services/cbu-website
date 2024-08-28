import { GET_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, GET_SALES_ORDER_ITEM_FETCH_DATA_START, GET_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}
export const fetchSalesOrderItem = (salesOrderItemId) => {
    return async (dispatch) => {
        dispatch({ type: GET_SALES_ORDER_ITEM_FETCH_DATA_START });

        await fetch(`/api/portal/getSalesOrderItem`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						salesOrderItemId:salesOrderItemId
					})
				})
					.then((response) => response.json())
					.then(({data}) => {
						
						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: GET_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
								payload: data
							});
						} else {
							dispatch({ 
								type: GET_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS,
								payload: data
							});
						}
					})
					.catch((error) =>  dispatch({ type: GET_SALES_ORDER_ITEM_FETCH_DATA_FAILURE }));
    };
};