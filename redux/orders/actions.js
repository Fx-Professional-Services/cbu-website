import { ORDERS_FETCH_DATA_START, ORDERS_FETCH_DATA_SUCCESS, ORDERS_FETCH_DATA_FAILURE } from '../constants'

const user =
    typeof window !== "undefined" ? localStorage.getItem("display_name") : null;
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}

export const fetchOrders = () => {
    return async (dispatch) => {
        dispatch({ type: ORDERS_FETCH_DATA_START });

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
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: Array.from(new Set(newOrderItems.map(JSON.stringify))).map(JSON.parse)
							});
						} else {
							dispatch({ 
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: newOrderItems
							});
						}
					})
					.catch((error) =>  dispatch({ type: ORDERS_FETCH_DATA_FAILURE }));
    };
};

export const searchOrders = (keyword) => {
	return async (dispatch) => {
        dispatch({ type: ORDERS_FETCH_DATA_START });

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
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: Array.from(new Set(newOrderItems.map(JSON.stringify))).map(JSON.parse)
							});
						} else {
							dispatch({ 
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: newOrderItems
							});
						}
					})
					.catch((error) =>  dispatch({ type: ORDERS_FETCH_DATA_FAILURE }));
    };
};

const renameFields = (data) => {
	return data.message.map((element) => ({
		serial: element.fieldData.serial,
		order_id: element.fieldData["__id"],
		subtotal: element.fieldData.subtotal,
		total: element.fieldData.total,
		created: element.fieldData.created,
		createdBy: element.fieldData['sales order__PARTY::display name'],
	}));
}