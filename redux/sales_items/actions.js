import { SALES_ITEM_FETCH_DATA_FAILURE, SALES_ITEM_FETCH_DATA_START, SALES_ITEM_FETCH_DATA_SUCCESS } from '../constants';
import { parseObject } from '../utils';

export const fetchSalesItems = () => {
    return async (dispatch) => {
        dispatch({ type: SALES_ITEM_FETCH_DATA_START });
        
        try {
            const response = await fetch(`/api/portal/getSalesItem`, {
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
            
            dispatch({ type: SALES_ITEM_FETCH_DATA_SUCCESS, payload: salesItem });
        } catch (error) {
            dispatch({ type: SALES_ITEM_FETCH_DATA_FAILURE });
            console.log(error);
        }
    };
};