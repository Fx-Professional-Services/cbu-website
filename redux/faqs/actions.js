import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './reducer';
let token_order;
if (typeof window !== "undefined") {
    token_order = window.localStorage.getItem("token_order");
}

import { FAQS_FETCH_DATA_START, FAQS_FETCH_DATA_SUCCESS, FAQS_FETCH_DATA_FAILURE } from '../constants'

export const fetchFaqs = () => {
    return async (dispatch) => {
        dispatch({ type: FAQS_FETCH_DATA_START });

        await fetch(`/api/portal/faq`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token_order,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const newFaq = data.message.response.data.map((element) => ({
                    question: element.fieldData["Question"],
                    answer: element.fieldData["Answer"],
                }));
                dispatch({ type: FAQS_FETCH_DATA_SUCCESS, payload: newFaq });
            })
            .catch((error) => {
                dispatch({ type: FAQS_FETCH_DATA_FAILURE });
            });
    };
};