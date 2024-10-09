import { MENU_FETCH_DATA_FAILURE, MENU_FETCH_DATA_START, MENU_FETCH_DATA_SUCCESS } from '../constants';
import { getItems, parseObject } from '../utils';

export const fetchMenu = (itemId) => { //orderId
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
          // console.log(data)

          const requiredFields = [
            "description",
            "item type",
            "_order id",
            "price",
            "quantity",
            "subtotal",
            "_channel id",
            "_customer tier id",
            "_item id",
            "_party id",
            "_parent order item id",
            "_configuration option item id",
            "summary subtotal with tax",
            "summary subtotal",
            "is hidden order",
            "is confirmed",
            "is invoiced",
            "is price hidden",
            "is quantity hidden"
          ]

          const unHiddenSalesOrderItems = data?.filter((el) => el["is hidden order"] != 1)
          const parsedData = await parseObject(unHiddenSalesOrderItems, requiredFields);
          // console.log(parsedData)
        
          // let itemDetails = await Promise.all(parsedData.map(async(el) => {
          //   try {
          //     let configId = el["_configuration option item id"] && el["_configuration option item id"] != null ? el["_configuration option item id"] : el["_item id"];
          //     let configField = el["_configuration option item id"] && el["_configuration option item id"] != null ? "_configuration option item id" : "_configuration id";

          //     let configOptions = await getConfigurationOptions(configId, configField)
          //     let itemCategory = []

          //     if(Array.isArray(configOptions) && configOptions.length != 0){
          //       itemCategory =  await Promise.all(configOptions.map(async(config) => {
          //         let category = await getCategoryItems(config["_category id"])
          //         return {
          //           ...config,
          //           category: category
          //         }
          //       }))
          //       console.log(itemCategory)
          //     }
          //     // await Promise.all(configOptions.map(async(config) => {
          //     //   let category = await getCategoryItems(config["_category id"])
          //     //   return {
          //     //     ...config,
          //     //     category: category
          //     //   }
          //     // }))
          //     // console.log(itemCategory, configOptions, configId)
          //     return {
          //           ...el,
          //           itemData: configOptions
          //       }
          //     } catch (error) {
          //       console.log(error)
          //     }
          //   }))
  
          let orderItems = await Promise.all(parsedData.map(async(el) => {
              try {
                let item = await getItems(el["_item id"])
                return {
                    ...el,
                    itemData: item
                }
              } catch (error) {
                console.log(error)
              }
          }))

          const parentChildItems = getParentChildOrderItems(orderItems);

          const result = {
            data: parentChildItems,
            rawData: orderItems
          }
         

          dispatch({ type: MENU_FETCH_DATA_SUCCESS, payload: result });
        } catch (error) {
            dispatch({ type: MENU_FETCH_DATA_FAILURE, payload: error });
            console.log(error);
        }
    };
};

const getParentChildOrderItems = (orders) => {
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