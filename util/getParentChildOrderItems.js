async function getParentChildOrderItems (orders) {
	let orderMap = new Map();

	// Initialize the map and add a 'suborders' array to each order
	orders?.forEach(order => {
		order.subOrders = [];
		orderMap?.set(order?.__id, order);
	});

	// Iterate over the orders and place each order into its parent's suborders array
	let rootOrders = [];
	orders.forEach(order => {
		if (order["_parent order item id"]) {
			let parentOrder = orderMap.get(order["_parent order item id"]);
			parentOrder?.subOrders?.push(order);
		} else {
			rootOrders?.push(order);
		}
	});

	return rootOrders;

}

export default getParentChildOrderItems;