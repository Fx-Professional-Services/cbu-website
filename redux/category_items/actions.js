import { CATEGORY_ITEMS_FETCH_DATA_FAILURE, CATEGORY_ITEMS_FETCH_DATA_START, CATEGORY_ITEMS_FETCH_DATA_SUCCESS } from '../constants';

export const fetchCategoryItems = (itemId) => {
    return async (dispatch) => {
        dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_START });

        try {
          const response = await fetch(`/api/portal/getCategoryItems`, {
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
        
          dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_SUCCESS, payload: items });
        } catch (error) {
            dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};

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