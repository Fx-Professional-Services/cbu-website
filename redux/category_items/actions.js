import { CATEGORY_ITEMS_FETCH_DATA_FAILURE, CATEGORY_ITEMS_FETCH_DATA_START, CATEGORY_ITEMS_FETCH_DATA_SUCCESS } from '../constants';
import { getItems } from '../utils';

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

          let items = await getItems(data); //map, while each item
          //getConfigurations
          //getCategories
          //getCategoryItems
          //getItems (recursive)


          dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_SUCCESS, payload: items });
        } catch (error) {
            dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};

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
//       .then( async ({ data }) => {
//         delete element["@odata.editLink"];
//         delete element["@odata.id"];
//         delete data["@odata.editLink"];
//         delete data["@odata.id"];
//         delete data["@odata.context"];
    
//           if(data["is configuration"] === 1) {
//               let fetchRecursiveOptions = fetch(`/api/portal/getConfiguratorOptions`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   id: data["__id"],
//                 })
//             })
//             .then(recursionRes => recursionRes.json())
//             .then(({data:items}) => {

//               if(items && items.length != 0) {
//                 let fetchOptions = items.map((item) => {
//                     return fetch(`/api/portal/getCategoryItems`, {
//                         method: "POST",
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                           id: item["_category id"],
//                         })
//                     })
//                     .then((categoryRes) => categoryRes.json())
//                     .then(async (categories) => {
//                         let itemOptions = await getItems(categories.data)
//                         return {
//                           ...item,
//                           categoryData: itemOptions
//                         }
//                     })
//                   })

//                   return Promise.all(fetchOptions)
//                   .then(option => {
//                       console.log(option); // check the fetched option
//                       return option.filter(optionItem => optionItem !== null); // remove null items if needed
//                   });
//                 }

//                 return null;
//             })
           
//             let categories = await fetchRecursiveOptions
//             return {
//               ...element,
//               itemData: {
//                 ...data,
//                 categoryData: {
//                   ...categories
//                 }
//               }
//             }
//           }

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