import { SUB_CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, SUB_CONFIGURATION_OPTIONS_FETCH_DATA_START, SUB_CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';
import { getCategories, getCategoryItems, getConfigurationOptions, getItems, parseObject } from '../utils';

export const fetchSubConfigurationOptions = (configurationItemId, configurationField) => {

    return async (dispatch) => {
        dispatch({ type: SUB_CONFIGURATION_OPTIONS_FETCH_DATA_START });

        try {
          const response = await fetch(`/api/portal/getConfiguratorOptions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: configurationItemId,
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
            let configuration = await getRecursiveConfiguration (el)
             return configuration
          }))
        
          dispatch({ type: SUB_CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS, payload: configurations });
        } catch (error) {
            dispatch({ type: SUB_CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};


async function getRecursiveConfiguration (item) {
  
  try {
      let categoryItems = await getCategoryItems(item["_category id"])

      let items = await Promise.all(categoryItems.map(async(catItem) => {

          let itemDetails = await getItems(catItem["_item id"]); 

          let itemsCategory = {
            ...itemDetails
          }

          if(itemsCategory["is configuration"] === 1) {
            let configurations = await getConfigurationOptions(itemDetails["__id"])
            let recursiveConfigurators = await Promise.all(configurations.map(async(el) => {
              let category = await getCategories(el["_category id"]);
              let subConfigurations = await getRecursiveConfiguration(el)
              return {
                ...category,
               ...subConfigurations
              }
            }))
            // console.log("recursiveConfigurators", recursiveConfigurators)
            return {
              ...itemDetails,
              categoryData: recursiveConfigurators
            }

          }

        return itemsCategory

      }))

      return {
        ...item,
        configuratorData: items
      } 

    } catch (error) {
      console.error(error)
      console.log(item)
    }

}