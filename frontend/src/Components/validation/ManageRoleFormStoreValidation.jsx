import * as Yup from 'Yup'

export const ManageRoleStoreValidation = Yup.object({
    role: Yup.string().required("Please Enter Role Name"),
})