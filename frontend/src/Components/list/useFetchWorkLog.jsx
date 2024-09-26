import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextprovider';

const useFetchWorkLog = () => {
    const [WorkLogData, setWorkLogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, setUser } = useStateContext();
    // console.log(user.emp_role);
    useEffect(() => {
      if(user.emp_role === 'ceo'){
        let isMounted = true;
        axiosClient.get('/work_log')
          .then(({ data }) => {
            if (isMounted && data.code === 200) {
              const processedData = data.WorkLog.map(WorkLogs => [
               WorkLogs.id,
               WorkLogs.date,
               WorkLogs.manage_user_arr[0].name,
               WorkLogs.manage_project_arr[0].projName,
               WorkLogs.task_title,
               WorkLogs.task_time,
               WorkLogs.task_status
              ]);
              setWorkLogData(processedData);
            }
          })
          .catch(err => {
            if (isMounted) {
              setError(err.response);
            }
          })
          .finally(() => {
            if (isMounted) {
              setLoading(false);
            }
          });
    
        return () => {
          isMounted = false;
        };
      } else {
        let isMounted = true;
        axiosClient.get('/work_log/show/'+user.id)
          .then(({ data }) => {
            if (isMounted && data.code === 200) {
              const processedData = data.WorkLog.map(WorkLogs => [
               WorkLogs.id,
               WorkLogs.date,
               WorkLogs.manage_user_arr[0].name,
               WorkLogs.manage_project_arr[0].projName,
               WorkLogs.task_title,
               WorkLogs.task_time,
               WorkLogs.task_status
              ]);
              setWorkLogData(processedData);
            }
          })
          .catch(err => {
            if (isMounted) {
              setError(err.response);
            }
          })
          .finally(() => {
            if (isMounted) {
              setLoading(false);
            }
          });
    
        return () => {
          isMounted = false;
        };
      }

      }, []);
      return { WorkLogData, loading, error, setWorkLogData };
      
    };
    
    export default useFetchWorkLog;