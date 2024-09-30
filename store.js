import { configureStore } from '@reduxjs/toolkit';
import categoryItemsReducer from './redux/category_items/reducer';
import checkIfExistSalesOrderItemReducer from './redux/check_ifExist_sales_order_item_/reducer';
import configurationsReducer from './redux/configurations/reducer';
import createSalesOrderItemReducer from './redux/create_sales_order_item/reducer';
import deleteSalesOrderItemReducer from './redux/delete_sales_order_item/reducer';
import eventsReducer from './redux/events/reducer';
import faqsReducer from './redux/faqs/reducer';
import getSalesOrderItemReducer from './redux/get_sales_order_item/reducer';
import invoicesReducer from './redux/invoices/reducer';
import itemsReducer from './redux/items/reducer';
import menuReducer from './redux/menu/reducer';
import ordersReducer from './redux/orders/reducer';
import salesItemsReducer from './redux/sales_items/reducer';
import singleSalesOrderReducer from './redux/sales_order/reducer';
import salesOrdersReducer from './redux/sales_orders/reducer';
import subConfigurationsReducer from './redux/subConfigurations/reducer';
import updateOrderItemReducer from './redux/update_order_item/reducer';


export const store = configureStore({
    reducer: {
        faqsReducer: faqsReducer,
        ordersReducer: ordersReducer,
        invoicesReducer: invoicesReducer,
        menuReducer: menuReducer,
        eventsReducer: eventsReducer,
        configurationsReducer: configurationsReducer,
        categoryItemsReducer: categoryItemsReducer,
        subConfigurationsReducer: subConfigurationsReducer,
        updateOrderItemReducer: updateOrderItemReducer,
        salesItemsReducer: salesItemsReducer,
        itemsReducer: itemsReducer,
        salesOrdersReducer: salesOrdersReducer,
        singleSalesOrderReducer: singleSalesOrderReducer,
        createSalesOrderItemReducer: createSalesOrderItemReducer,
        deleteSalesOrderItemReducer: deleteSalesOrderItemReducer,
        getSalesOrderItemReducer: getSalesOrderItemReducer,
        checkIfExistSalesOrderItemReducer: checkIfExistSalesOrderItemReducer,
    },
});