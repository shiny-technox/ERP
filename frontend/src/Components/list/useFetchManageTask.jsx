import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchManageTask = () => {
  const [manageTasktData, setManageTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/manage_task')
      .then(({ data }) => {
        if (isMounted && data.code === 200) {
          const processedData = data.ManageTask.map(ManageTasks => [
            ManageTasks.id,
            ManageTasks.arr_project.projName,
            ManageTasks.taskTitle,
            ManageTasks.taskTime,
            ManageTasks.taskStatus
          ]);
          setManageTaskData(processedData);
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
  }, []);

  return { manageTasktData, loading, error, setManageTaskData };
};

export default useFetchManageTask;
