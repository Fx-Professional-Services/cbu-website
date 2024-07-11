import { ITEMS_FETCH_DATA_FAILURE, ITEMS_FETCH_DATA_START, ITEMS_FETCH_DATA_SUCCESS } from '../constants';
import { parseObject } from '../utils';

export const fetchAllItems = () => {
    return async (dispatch) => {
        dispatch({ type: ITEMS_FETCH_DATA_START });
        
        try {
            const response = await fetch(`/api/portal/get_all_items`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              }
            });
            const { data } = await response.json();
            
  
            const requiredFields = [
                "name",
                "is product",
                "is service",
                "is discount",
                "is fee",
                "type",
                "is configuration",
                "_unit of measure id",
                "is sales item",
                "is equipment",
                "_active bom id",
                "demand method",
                "is consumable",
                "replenishment method",
                "_preferred vendor id",
                "is pick item",
                "is bakery item",
                "is current item",
                "customer facing name",
                "is hidden order",
                "customer facing description",
                "similarity score",
                "semantic find data"
            ];

            const salesItem = await parseObject(data.value, requiredFields);
            
            dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, payload: salesItem });
        } catch (error) {
            dispatch({ type: ITEMS_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};