import { UPDATE_ORDERS_FETCH_DATA_FAILURE, UPDATE_ORDERS_FETCH_DATA_START, UPDATE_ORDERS_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}

export const updateOrderItem = (id, itemId) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDERS_FETCH_DATA_START });

        await fetch(`/api/portal/updateSalesOrderItem`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: id,
						itemId: itemId
					})
				})
					.then((response) => response.json())
					.then(({data}) => {
						
						let parsedSalesOrderItems = renameFields(data)
						console.log(parsedSalesOrderItems)

						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: UPDATE_ORDERS_FETCH_DATA_SUCCESS,
								payload: Array.from(new Set(parsedSalesOrderItems.map(JSON.stringify))).map(JSON.parse)
							});
						} else {
							dispatch({ 
								type: UPDATE_ORDERS_FETCH_DATA_SUCCESS,
								payload: parsedSalesOrderItems
							});
						}
					})
					.catch((error) =>  dispatch({ type: UPDATE_ORDERS_FETCH_DATA_FAILURE }));
    };
};

export const searchOrders = (keyword) => {
	return async (dispatch) => {
        dispatch({ type: UPDATE_ORDERS_FETCH_DATA_START });

        await fetch(`/api/portal/getsalesorders`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: token_order,
						user: user,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						const newOrderItems = renameFields(data);

						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: UPDATE_ORDERS_FETCH_DATA_SUCCESS,
								payload: Array.from(new Set(newOrderItems.map(JSON.stringify))).map(JSON.parse)
							});
						} else {
							dispatch({ 
								type: UPDATE_ORDERS_FETCH_DATA_SUCCESS,
								payload: newOrderItems
							});
						}
					})
					.catch((error) =>  dispatch({ type: UPDATE_ORDERS_FETCH_DATA_FAILURE }));
    };
};

const renameFields = (data) => {
	return data.map((element) => ({
		serial: element.serial,
		order_id: element["__id"],
		created: element.created,
		total: element["total invoiced"]
	}));
}