import { MENU_FETCH_DATA_FAILURE, MENU_FETCH_DATA_START, MENU_FETCH_DATA_SUCCESS } from '../constants';

const token_order = typeof window !== "undefined" ? localStorage.getItem("token_order") : null;

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

          let items = await getItems(data);
          // const result = buildHierarchy(renameFields(data));
          dispatch({ type: MENU_FETCH_DATA_SUCCESS, payload: items });
        } catch (error) {
            dispatch({ type: MENU_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};

// const buildHierarchy = (items, parentId = '', level = 0) => {
//     const filteredItems = items.filter(item => item.parent_id === parentId && item.item_level === Number(level));
  
//     if (filteredItems.length === 0) { 
//       return [];
//     }
  
//     return filteredItems.map(item => {
//       const childItems = buildHierarchy(items, item.item_id, String(Number(level) + 1));
//       if (childItems.length > 0) {
//         return { ...item, childItems };
//       }
//       return item;
//     });
// };

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
