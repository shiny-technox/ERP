import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

function useFetchManageHosting() {
    const [manageHostingData, setManageHostingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {

      let isMounted = true;
      axiosClient.get('/manage_hosting')
        .then(({ data }) => {
         // console.log(data);
          if (isMounted && data.code === 200) {
            const processedData = data.ManageHosting.map(ManageHostings => [
              ManageHostings.id,
              ManageHostings.hosting_name,
              ManageHostings.hosting_provider,
              ManageHostings.hosting_expired_date,
            ]);
            setManageHostingData(processedData);
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
    //console.log(manageHostingData);
    return { manageHostingData, loading, error, setManageHostingData };
}

export default useFetchManageHosting