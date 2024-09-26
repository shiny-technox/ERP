import * as Yup from 'Yup'

export const EmployeeScheduleInterviewValidation = Yup.object ({
    interviewerName: Yup.string().required("Please Enter Interviewer Name"),
    interviewerEmail: Yup.string().required("Please Enter Interviewer Email"),
    interviewerPhone: Yup.string().required("Please Enter Interviewer Phone"),
    interviewScheduleDate: Yup.string().required("Please Enter Interviewe Date"),
    interviewScheduleTime: Yup.string().required("Please Enter Interviewe Time")
})