import { CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, CONFIGURATION_OPTIONS_FETCH_DATA_START, CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';

export const fetchConfigurationOptions = (itemId) => {
    return async (dispatch) => {
        dispatch({ type: CONFIGURATION_OPTIONS_FETCH_DATA_START });

        try {
          const response = await fetch(`/api/portal/getConfiguratorOptions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: itemId,
              })
          });
          const { data } = await response.json();

          let configurations = await getCategories(data);
        
          dispatch({ type: CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS, payload: configurations });
        } catch (error) {
            dispatch({ type: CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};

const getCategories = (data) => {
  let fetchPromises = data.map(element => {
      return fetch(`/api/portal/getCategories`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              categoryId: element["_category id"],
          })
      })
      .then(response => response.json())
      .then(({ data }) => {

        delete data["@odata.editLink"];
        delete data["@odata.id"];
        delete element["@odata.editLink"];
        delete element["@odata.id"];

        return {
          ...element,
          categoryData: data
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


// const getItems = (data) => {
//   let fetchPromises = data.map(element => {
//       return fetch(`/api/portal/getItem`, {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//               itemId: element["_item id"],
//           })
//       })
//       .then(response => response.json())
//       .then(({ data }) => {
//         delete element["@odata.editLink"];
//         delete element["@odata.id"];
//         delete data["@odata.editLink"];
//         delete data["@odata.id"];
//         delete data["@odata.context"];
//         return {
//           ...element,
//           itemData: data
//         }
//       })
//       .catch(error => {
//           console.log(error);
//           return null; // handle error gracefully
//       });
//   });

//   return Promise.all(fetchPromises)
//       .then(items => {
//           // console.log(items); // check the fetched items
//           return items.filter(item => item !== null); // remove null items if needed
//       });
// }