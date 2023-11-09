
import authHeader from "../../../src/redux/Services/authHeader";
import { ADD_CARD, GET_CARDS, GET_SINGLE_CARD, UPDATE_CARD, UPDATE_DUE_DATE } from "../../api/constApi";
import { apiInstance } from "./axiosApi";


export const addCardServices = (payload) => {
    return apiInstance.post(ADD_CARD, payload, {
        headers: authHeader(),
    });
};
export const updateCardServices = (payload) => {
    return apiInstance.post(UPDATE_CARD, payload, {
        headers: authHeader(),
    });
};
export const getCardServes = (payload) => {
    return apiInstance.post(GET_CARDS, payload, {
        headers: authHeader(),
    });
};
export const updatecardDueDateServices = (payload) => {
    return apiInstance.post(UPDATE_DUE_DATE, payload, {
        headers: authHeader(),
    });
};
export const getSingleCardServices = (payload) => {
    return apiInstance.post(GET_SINGLE_CARD, payload, {
        headers: authHeader(),
    });
};
// export const getAllUserServices = (payload) => {
//     return apiInstance.post(GET_ALL_USER, payload, {
//         headers: authHeader(),
//     });
// };
