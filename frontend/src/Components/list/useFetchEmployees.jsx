import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchEmployees = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/employee')
      .then(({ data }) => {
        if (isMounted && data.code === 200) {
          const processedData = data.user.map(employee => [
            employee.id,
            employee.name,
            employee.emp_role,
            employee.email,
            employee.dob,
          ]);
          setDatas(processedData);
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

  return { datas, loading, error, setDatas };
};

export default useFetchEmployees;
