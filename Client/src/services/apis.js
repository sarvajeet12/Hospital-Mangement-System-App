// const BASE_URL = import.meta.env.VITE_BASE_URL
const BASE_URL = "http://localhost:4000/api/v1";




export const auth = {
    SIGNUP_API: BASE_URL + "/user/register",
    LOGIN_API: BASE_URL + "/user/login",
    USER_API: BASE_URL + "/user/user-details",
    SEND_OTP_API: BASE_URL + "/user/send-otp",
    RESEND_OTP_API: BASE_URL + "/user/resend-otp",
    FORGOT_PASSWORD_API: BASE_URL + "/user/forgot-password"

}

export const msg = {
    MSG_API: BASE_URL + "/message/send",
    DELETE_MSG_API: BASE_URL + "/message/delete-message"
}


export const appoint = {
    APPOINTMENT_API: BASE_URL + "/appointment/get-appointment",
    APPOINTMENT_DETAILS_API: BASE_URL + "/appointment/your-appointment"
}


export const admin = {
    GET_ALL_APPOINTMENT_API: BASE_URL + "/admin/get/appointment",
    GET_ALL_MSG_API: BASE_URL + "/admin/get-all-msg",
    ADD_DOCTORS_API: BASE_URL + "/admin/register/doctor",
    GET_ALL_DOCTORS: BASE_URL + "/admin/get/doctors",
    GET_SINGLE_DOCTOR_DATA: BASE_URL + "/admin/doctors/read-more/:id",
    UPDATE_DOCTOR_API: BASE_URL + "/admin/doctors/update/:id"
}
