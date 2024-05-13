import { ORDERS_FETCH_DATA_FAILURE, ORDERS_FETCH_DATA_START, ORDERS_FETCH_DATA_SUCCESS } from '../constants';

const user =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;
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
						user: user
					})
				})
					.then((response) => response.json())
					.then(({data}) => {
						
						let parsedSalesOrderItems = renameFields(data)
						if (process.env.NODE_ENV === "development") {
							dispatch({ 
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: Array.from(new Set(parsedSalesOrderItems.map(JSON.stringify))).map(JSON.parse)
							});
						} else {
							dispatch({ 
								type: ORDERS_FETCH_DATA_SUCCESS,
								payload: data
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
	return data.map((element) => ({
		serial: element.serial,
		order_id: element["__id"],
		created: element.created,
		total: element["total invoiced"]
	}));
}