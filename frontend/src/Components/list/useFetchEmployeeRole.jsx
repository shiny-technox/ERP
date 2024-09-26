import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchEmployeeRole = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/manage_role')
      .then(({ data }) => {
        if (isMounted && data.code === 200) {
          const processedData = data.EmployeeRole.map(EmployeeRoles => [
            EmployeeRoles.id,
            EmployeeRoles.role
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

export default useFetchEmployeeRole;
