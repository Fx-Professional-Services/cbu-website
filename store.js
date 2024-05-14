import { configureStore } from '@reduxjs/toolkit';
import faqsReducer from './redux/faqs/reducer';
import ordersReducer from './redux/orders/reducer';
import invoicesReducer from './redux/invoices/reducer';
import menuReducer from './redux/menu/reducer';
import eventsReducer from './redux/events/reducer';
import configurationsReducer from './redux/configurations/reducer';

export const store = configureStore({
    reducer: {
        faqsReducer: faqsReducer,
        ordersReducer: ordersReducer,
        invoicesReducer: invoicesReducer,
        menuReducer: menuReducer,
        eventsReducer: eventsReducer,
        configurationsReducer: configurationsReducer,
    },
});