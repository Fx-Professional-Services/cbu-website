import { INVOICES_FETCH_DATA_START, INVOICES_FETCH_DATA_SUCCESS, INVOICES_FETCH_DATA_FAILURE } from '../constants'

const user = typeof window !== "undefined" ? localStorage.getItem("display_name") : null;
const token_accounting = typeof window !== "undefined" ? localStorage.getItem("token_accounting") : null;

export const fetchInvoices = () => {
    return async (dispatch) => {
        dispatch({ type: INVOICES_FETCH_DATA_START });

        let invoiceData = {
            __id: "",
            created: "",
            subtotal: "",
            "transaction date": ""
        };

        await fetch(`/api/portal/get_invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token_accounting,
                user: user,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                invoiceData = data.message.map((element) => ({
                    __id: element.fieldData["__id"],
                    serial: element.fieldData.serial,
                    created: element.fieldData.created,
                    total: element.fieldData.total,
                }));

                if (process.env.NODE_ENV === "development") {
                    dispatch({
                        type: INVOICES_FETCH_DATA_SUCCESS,
                        payload: Array.from(new Set(allItems.map(JSON.stringify))).map(JSON.parse)
                    })
                } else {
                    dispatch({ type: INVOICES_FETCH_DATA_SUCCESS, payload: InvoiceItems})
                }
            })
            .catch((error) => dispatch({ type: INVOICES_FETCH_DATA_FAILURE }));
    };
};