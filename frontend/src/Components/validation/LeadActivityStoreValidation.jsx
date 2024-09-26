import * as Yup from 'Yup'

export const LeadActivityStoreValidation = Yup.object ({
    leadStatus: Yup.string().required("Please Select Lead Status"),
    leadDesc: Yup.string().required("Please Enter Description"),
    // next_appointment_date: Yup.date().required("Please Enter Appointment Date"),
    // next_appointment_time: Yup.string().required("Please Eneter Time"),

})