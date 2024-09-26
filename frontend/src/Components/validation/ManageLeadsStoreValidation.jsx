import * as Yup from 'Yup'

const phoneRegExp = /^[6-9]\d{9}$/;

export const ManageLeadsStoreValidation = Yup.object({
    date: Yup.date().required("Please Enter Date"),
    name: Yup.string().required("Please Enter Name"),
    company : Yup.string().required("Please Enter Company"),
    leadType: Yup.string().required("Please Select Lead Type"),
    contactNumber: Yup.string().matches(phoneRegExp,"Phone Number is Not valid").required("Please Enter Phone Number"),
    ownerContactNumber: Yup.string().matches(phoneRegExp,"Phone Number is Not valid").required("Please Enter Phone Number"),
    requirement: Yup.string().required("Please Enter Requirement"),
    status: Yup.string().required("Please Select State")    
})