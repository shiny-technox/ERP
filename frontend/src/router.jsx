import {createBrowserRouter} from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import Employee from './Components/Employee.jsx';
import CreateEmp from './Components/CreateEmp.jsx';
import Dashboard from './Components/dashboard.jsx';
import EditEmp from './Components/EditEmp.jsx';
import ManageProject from './Components/master/ManageProject.jsx';
import ManageProjectForm from './Components/form/ManageProjectForm.jsx';
import ManageTask from './Components/master/ManageTask.jsx';
import ManageTaskForm from './Components/form/ManageTaskForm.jsx';
import ManageProfile from './Components/master/ManageProfile.jsx';
import Test from './Components/Test.jsx';
import PushNotification from './Components/notification/PushNotification.jsx';

import Page1 from './Components/Page1.jsx';
import Page2 from './Components/Page2.jsx';
import Page3 from './Components/Page3.jsx';

import EmoloyeeDashboard from './Components/master/EmployeeDashboard.jsx';
import ManageAttendance from './Components/master/ManageAttendance.jsx';
import TriggerNotificationButton from './Components/notification/TriggerNotificationButton.jsx';
import ManageDomain from './Components/master/ManageDomain.jsx';
import ManageDomainForm from './Components/form/ManageDomainForm.jsx';
import ManageHosting from './Components/master/ManageHosting.jsx';
import ManageHostingForm from './Components/form/ManageHostingForm.jsx';
import WorkLog from './Components/master/WorkLog.jsx';
import WorkLogForm from './Components/form/WorkLogForm.jsx';
import AttendanceReport from './Components/reports/AttendanceReport.jsx';
import ApplyLeave from './Components/master/ApplyLeave.jsx';
import AssignLeave from './Components/master/AssignLeave.jsx';
import ManageLeads from './Components/leads/ManageLeads.jsx';
import ManageSSL from './Components/master/ManageSSL.jsx';
import ManageSSLForm from './Components/form/ManageSSLForm.jsx';
import ManageRole from './Components/master/ManageRole.jsx';
import ManageLeadStatus from './Components/leads/ManageLeadStatus.jsx';

import EmployeeProfile from './Components/employee/Profile/EmployeeProfile.jsx';





import ManageEmployeeDashboard from './Components/employee/dashboard/ManageEmployeeDashboard.jsx';
import EmployeeRole from './Components/employee/role/EmployeeRole.jsx';
import EmployeeRoleForm from './Components/employee/role/EmployeeRoleForm.jsx';
import EmployeeScheduleInterview from './Components/employee/interview/EmployeeScheduleInterview.jsx';
import EmployeeScheduleInterviewForm from './Components/employee/interview/EmployeeScheduleInterviewForm.jsx';
import EmployeeProfileForm from './Components/employee/Profile/EmployeeProfileForm.jsx';
import LeadsDashboard from './Components/leads/dashboard/LeadsDashboard.jsx';
import EmployeeBirthday from './Components/employee/Birthday/EmployeeBirthday.jsx';
import TaxInvoice from './Components/TaxInvoice/TaxInvoice.jsx';
import ManageSalesForm from './Components/form/ManageSalesForm.jsx';
import ManageLeadsForm from './Components/leads/ManageLeadsForm.jsx';




const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children: [
            {
                path:'/users',
                element:<Users />,
            },
            {
                path:'/dashboard',
                element:<Dashboard />,
            },
            {
                path:'/employee/attendance',
                element:<ManageAttendance />,
            },
            {
                path:'/employee_dashboard',
                element:<EmoloyeeDashboard />,
            },
            {
                path:'/employee/dashboard',
                element:<ManageEmployeeDashboard />,
            },
            {
                path:'/employee/list',
                element:<Employee />,
            },
            {
                path:'/employee/create',
                element:<CreateEmp />,
            },
            {
                path:'/employee/edit/:id',
                element:<EditEmp />,
            },
            {

                path:'/employee/profile/edit/:id',
                element:<EmployeeProfileForm/>,
            },

            {
                path:'/employee/role',
                element:<EmployeeRole />,

            },
            {
                path:'/employee/role/create',
                element:<EmployeeRoleForm />,
            },
            {
                path:'/employee/role/edit/:id',
                element:<EmployeeRoleForm />,
            },
            {
                path: '/employee/schedule-interview',
                element:<EmployeeScheduleInterview/>
            },
            {
                path: '/employee/schedule-interview/create',
                element:<EmployeeScheduleInterviewForm/>
            },
            {
                path: '/employee/schedule-interview/edit/:id',
                element:<EmployeeScheduleInterviewForm/>
            },
            {
                path:'/employee/work-log',
                element:<WorkLog />,
            },
            {
                path:'/employee/profile',
                element:<EmployeeProfile/>
            },
            {
                path:'leads/dashboard',
                element:<LeadsDashboard/>,
            },
            {
                path:'leads/list',
                element:<ManageLeads/>,
            },
            {
                path:'leads/create',
                element:<ManageLeadsForm/>,
            },
            {
                path:'leads/edit/:id',
                element:<ManageLeadsForm/>,
            },
            {
                path:'/leads/status/:id',
                element:<ManageLeadStatus/>,
            },
            {
                path:'/manage_project',
                element:<ManageProject />,
            },
            {
                path:'/manage_project/create',
                element:<ManageProjectForm />,
            },
            {
                path:'/manage_project/edit/:id',
                element:<ManageProjectForm />,
            },
            {
                path:'/manage_task',
                element:<ManageTask />,
            },
            {
                path:'/manage_task/create',
                element:<ManageTaskForm />,
            },

            {
                path:'/work_log/create',
               element:<WorkLogForm />
            },
            {
                path:'/work_log/edit/:id',
               element:<WorkLogForm />
            },
            {
                path:'/manage_profile',
                element:<ManageProfile />,
            },
            {
                path:'/manage_domain',
                element:<ManageDomain />,
            },
            {
                path:'/manage_domain/create',
                element:<ManageDomainForm />,
            },
            {
                path:'/manage_domain/:id',
                element:<ManageDomainForm />,
            },
            {
                path:'/manage_ssl',
                element:<ManageSSL/>,
            },
            {
                path:'/manage_ssl/create',
                element:<ManageSSLForm />,
            },
            {
                path:'/manage_ssl/:id',
                element:<ManageSSLForm />,
            },
          
            {
                path:'/manage_hosting',
                element:<ManageHosting />,
            },
            {
                path:'/manage_hosting/create',
                element:<ManageHostingForm />,
            },
            {
                path:'/manage_hosting/:id',
                element:<ManageHostingForm />,
            },
            {
                path:'/attendance_report',
                element:<AttendanceReport />,
            },
            {
                path:'/page2',
                element:<Page2 />,
            },
            {
                path:'/page3',
                element:<Page3 />,
            },

            {
                path:'/test',
                element:<Test />,
            },
            {
                path:'/push-notification',
                element:<TriggerNotificationButton />,
            },
            {
                path:'/apply_leave',
                element:<ApplyLeave />,
            },
            {
                path:'/assign_leave',
                element:<AssignLeave />,
            },
            {
                path:'/manage_leads',
                element:<ManageLeads/>
            },


            {
                path:'/employee/profile',
                element:<EmployeeProfile/>
            },
            {
                path:'/employee/birthday',
                element:<EmployeeBirthday/>
            },
            {
                path:'/manage_taxinvoice',
                element:<TaxInvoice/>
            },
            {
                path:'/manage_sales',
                element:<ManageSalesForm/>
            },


        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children: [
            {
                path:'/login',
                element:<Login />,
            },
            {
                path:'/register',
                element:<Register />,
            }
        ]
    }
]);

export default router;