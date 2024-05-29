import { CATEGORY_ITEMS_FETCH_DATA_FAILURE, CATEGORY_ITEMS_FETCH_DATA_START, CATEGORY_ITEMS_FETCH_DATA_SUCCESS } from '../constants';
import { getCategories, getItems, getConfigurationOptions, getCategoryItems} from '../utils';

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
      let items = await getItems(data)
      let recursiveItems = await getConfigurationData(data)
      console.log(recursiveItems)
      
      dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_SUCCESS, payload: recursiveItems });
    } catch (error) {
      dispatch({ type: CATEGORY_ITEMS_FETCH_DATA_FAILURE });
      console.log(error);
    }
  };
};

async function getConfigurationData (data) {
  let items = await getItems(data); //map, while each item

  let fetchRecursiveConfigurations = await Promise.all(items.map(async(item) => {

    if(item.itemData["is configuration"]){

      let configurationOption = await getConfigurationOptions(item.itemData["__id"])
      let categories = await getCategories(configurationOption);
      let categoryItems = await Promise.all(categories.map(async(category) => {
          let categoryItem = await getCategoryItems(category["_category id"])
        
          return {
            ...category,
            itemData: [...categoryItem]
          }

      })); 

      let recursiveItems = await Promise.all(categoryItems.map(async(item) => {
          let categoryItems = await getConfigurationData(item.itemData);

          // console.log("catItems => ", item.itemData)
          return {
            ...item,
            itemData: categoryItems,
          }
      }))
    
      let recursiveConfigurators = {
          ...item,
          itemData: {
            ...item.itemData,
            categoryData: [...recursiveItems]
          }
      }

      return recursiveConfigurators;

    }

    return item;
    
  })) 
  return fetchRecursiveConfigurations;
  // console.log(fetchRecursiveConfigurations)

}
