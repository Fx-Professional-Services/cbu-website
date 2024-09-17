import { ORDER_FETCH_DATA_FAILURE, ORDER_FETCH_DATA_START, ORDER_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}
export const fetchSalesOrder = (salesOrderId) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_FETCH_DATA_START });

        await fetch(`/api/portal/getSalesOrder`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						salesOrderId: salesOrderId
					})
				})
					.then((response) => response.json())
					.then(({data}) => {
						
						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: ORDER_FETCH_DATA_SUCCESS,
								payload: data
							});
						} else {
							dispatch({ 
								type: ORDER_FETCH_DATA_SUCCESS,
								payload: data
							});
						}
					})
					.catch((error) =>  dispatch({ type: ORDER_FETCH_DATA_FAILURE }));
    };
};