// import axios from "axios";
// import {
//     PERSONAL_DETAIL_EVENT,
//     PERSONAL_DETAIL_ID,
//     PINCODEMATCH,
// } from "../../../api/constApi";
// import authHeader from "../authHeader";
import { APPROVE_USER, CREATE_USER, DISAPPROVE_USER, GET_ALL_USER } from "../../../api/constApi";
import authHeader from "../../../redux/Services/authHeader";
// import authHeader from "../../../redux/Services/authHeader";
import { apiInstance } from "../../../redux/Services/axiosApi";
// import { apiInstance } from "../axiosApi";

export const createUserServices = (payload) => {
    return apiInstance.post(CREATE_USER, payload, {
        headers: authHeader(),
    });
};
export const getAllUserServices = (payload) => {
    return apiInstance.post(GET_ALL_USER, payload, {
        headers: authHeader(),
    });
};
export const approveUserServices = (payload) => {
    return apiInstance.post(APPROVE_USER, payload, {
        headers: authHeader(),
    });
};
export const disApproveUserServices = (payload) => {
    return apiInstance.post(DISAPPROVE_USER, payload, {
        headers: authHeader(),
    });
};
// export const personalDetailEvent = (payload) => {
//     return apiInstance.post(PERSONAL_DETAIL_EVENT, payload, {
//         headers: authHeader(),
//     });
// };
// export const pincodeValidation = (values) => {
//     return axios.get(`${PINCODEMATCH}${values}`, {
//         headers: authHeader(),
//     });
// };
