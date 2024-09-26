import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

function useFetchManageDomain() {
    const [manageDomainData, setManageDomainData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {

      let isMounted = true;
      axiosClient.get('/manage_domain')
        .then(({ data }) => {
         // console.log(data);
          if (isMounted && data.code === 200) {
            const processedData = data.manageDomain.map(ManageDomains => [
              ManageDomains.id,
              ManageDomains.domain_name,
              ManageDomains.domain_provider,
              ManageDomains.domain_expired_date,
            ]);
            setManageDomainData(processedData);
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
    //console.log(manageDomainData);
    return { manageDomainData, loading, error, setManageDomainData };
}

export default useFetchManageDomain