import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchManageAttendance = () => {
  const [manageAttendanceData, setManageAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/manage_attendance')
      .then(({ data }) => {
       // console.log(data);
        if (isMounted && data.code === 200) {
          const processedData = data.ManageAttendance.map(ManageAttendances => [
            ManageAttendances.id,
            ManageAttendances.date,
            ManageAttendances.empId,
            ManageAttendances.name,
            ManageAttendances.minInTime,
            ManageAttendances.maxOutTime,
            ManageAttendances.totalWorking,
          ]);
          setManageAttendanceData(processedData);
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

  return { manageAttendanceData, loading, error, setManageAttendanceData };
};

export default useFetchManageAttendance;
