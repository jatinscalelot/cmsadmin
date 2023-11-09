
import { LOGIN, RESET_PASSWORD } from "../../api/constApi";
import Login from "../../components/auth/Login";
import authHeader from "./authHeader";
// import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const logIn = (payload) => {
    return apiInstance.post(LOGIN, payload);
};

export const changePass = (payload) => {
    return apiInstance.post(RESET_PASSWORD, payload, {
        headers: authHeader(),
    });
};

// export const newPass = (payload) => {
//     return apiInstance.post(NEW_PASSWORD, payload);
// };

// export const otp = (payload) => {
//     return apiInstance.post(OTP, payload);
// };

// export const resendOtp = (payload) => {
//     return apiInstance.post(RESEND_OTP, payload);
// };

// export const register = (payload) => {
//     return apiInstance.post(REGISTER, payload);
// };

// export const logOut = () => {
//     return apiInstance.post(LOGOUT, {}, { headers: authHeader() });
// };
