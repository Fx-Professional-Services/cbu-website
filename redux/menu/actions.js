import { MENU_FETCH_DATA_START, MENU_FETCH_DATA_SUCCESS, MENU_FETCH_DATA_FAILURE } from '../constants'

const token_order = typeof window !== "undefined" ? localStorage.getItem("token_order") : null;

export const fetchMenu = (itemId) => {
    return async (dispatch) => {
        dispatch({ type: MENU_FETCH_DATA_START });

        await fetch(`/api/portal/getsalesorders_items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token_order,
              id: itemId,
            })
          })
            .then((response) => response.json())
            .then((data) => {
                const result = buildHierarchy(renameFields(data));
                dispatch({ type: MENU_FETCH_DATA_SUCCESS, payload: result });
            })
            .catch((error) => dispatch({ type: MENU_FETCH_DATA_FAILURE }));
    };
};

const buildHierarchy = (items, parentId = '', level = 0) => {
    const filteredItems = items.filter(item => item.parent_id === parentId && item.item_level === Number(level));
  
    if (filteredItems.length === 0) { 
      return [];
    }
  
    return filteredItems.map(item => {
      const childItems = buildHierarchy(items, item.item_id, String(Number(level) + 1));
      if (childItems.length > 0) {
        return { ...item, childItems };
      }
      return item;
    });
};

const renameFields = (data) => {
    return data.message
      .map((element) => ({
          item_name: element["Item::name"],
          item_qty: element["Sales Order Item::quantity"],
          item_price: element["Sales Order Item::price"],
          item_type: element["Item::type"],
          item_measure: element["Unit Of Measure::name"],
          item_level: element["Order Item::level"],
          is_configurator: element["Item::is configuration"],
          item_id: element["Sales Order Item::__id"],
          mod_id: element["modId"],
          parent_id: element["Order Item::_parent order item id"],
          configuration_id: element["Sales Order Item::_item id"],
        }
      ));
  }