import { CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, CONFIGURATION_OPTIONS_FETCH_DATA_START, CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';
import { getCategories } from '../utils';

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