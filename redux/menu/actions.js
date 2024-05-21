import { MENU_FETCH_DATA_FAILURE, MENU_FETCH_DATA_START, MENU_FETCH_DATA_SUCCESS } from '../constants';

export const fetchMenu = (itemId) => {
    return async (dispatch) => {
        dispatch({ type: MENU_FETCH_DATA_START });

        try {
          const response = await fetch(`/api/portal/getsalesorders_items`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemId,
              })
          });
          const { data } = await response.json();

          let orderItems  = await getItems(data);
          const result = getParentChildOrderItems(orderItems);

          dispatch({ type: MENU_FETCH_DATA_SUCCESS, payload: result });
        } catch (error) {
            dispatch({ type: MENU_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};

const getParentChildOrderItems = (orders) => {
  let orderMap = new Map();
    
  // Initialize the map and add a 'suborders' array to each order
  orders.forEach(order => {
      order.subOrders = [];
      orderMap.set(order.__id, order);
  });
  
  // Iterate over the orders and place each order into its parent's suborders array
  let rootOrders = [];
  orders.forEach(order => {
      if (order["_parent order item id"]) {
          let parentOrder = orderMap.get(order["_parent order item id"]);
          parentOrder.subOrders.push(order);
      } else {
          rootOrders.push(order);
      }
  });
  
  return rootOrders;
}

  const getItems = (data) => {
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
          delete element["@odata.editLink"];
          delete element["@odata.id"];
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
}
