import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchManageTask = () => {
  const [manageLeadsData, setManageLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/manage-leads')
      .then(({ data }) => {
    //   console.log(data);
        if (isMounted && data.code === 200) {
          const processedData = data.ManageLeads.map(ManageLeadsData => [
            ManageLeadsData.id,
            ManageLeadsData.date,
            ManageLeadsData.name,
            ManageLeadsData.company,
            ManageLeadsData.leads_type
          ]);
          setManageLeadsData(processedData);
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

  return { manageLeadsData, loading, error, setManageLeadsData };
};

export default useFetchManageTask;
