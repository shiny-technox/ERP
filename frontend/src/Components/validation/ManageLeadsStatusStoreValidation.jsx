import * as Yup from 'Yup'

export const ManageLeadsStatusStoreValidation = Yup.object ({
    progress: Yup.string().required("Please Enter Progress"),
    description: Yup.string().required("Please Enter Description"),

})