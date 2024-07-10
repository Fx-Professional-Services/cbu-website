import { CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, CONFIGURATION_OPTIONS_FETCH_DATA_START, CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';
import { getCategories, parseObject } from '../utils';

export const fetchConfigurationOptions = (itemId, configurationField) => {

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
                field: configurationField
              })
          });
          const { data } = await response.json();
          const requiredFields = [
            "_configuration option item id",
            "_configuration id",
            "_category id",
            "type",
            "selections",
            "maximum quantity",
            "minimum quantity",
          ];
          let parsedData = await parseObject(data, requiredFields)
          parsedData = Array.isArray(parsedData) ? parsedData : [parsedData]

          let configurations = await Promise.all(parsedData.map(async(el) => {
            let configuration = await getConfigurationCategories (el)
             return configuration
          }))
        
          dispatch({ type: CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS, payload: configurations });
        } catch (error) {
            dispatch({ type: CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};


async function getConfigurationCategories (item) {
  
  try {
      let category = await getCategories(item["_category id"]);
      return {
        ...item,
        categoryData: {
          ...category
        }
      } 
  
      // let categoryItems = await getCategoryItems(item["_category id"])

      // let items = await Promise.all(categoryItems.map(async(catItem) => {

      //     let itemDetails = await getItems(catItem["_item id"]); 

      //     let itemsCategory = {
      //       ...itemDetails
      //     }

      //     if(itemsCategory["is configuration"] === 1) {
      //       let configurations = await getConfigurationOptions(itemDetails["__id"])
      //       let recursiveConfigurators = await Promise.all(configurations.map(async(el) => {
      //         return await getRecursiveConfiguration(el)
      //       }))
      //       // console.log("recursiveConfigurators", recursiveConfigurators)
      //       return recursiveConfigurators
      //     }

      //   return itemsCategory

      // }))

      // console.log({
      //   ...item,
      //   categoryData: {
      //     ...category,
      //     configurationData: items
      //   }
      // } )

     

    } catch (error) {
      console.error(error)
      console.log(item)
    }

}