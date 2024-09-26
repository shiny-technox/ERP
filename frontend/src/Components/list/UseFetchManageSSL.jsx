import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

function useFetchManageSSL() {
    const [manageSSLData, setManageSSLData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        let isMounted = true;
        
        axiosClient.get('/manage_ssl')
            .then(({ data }) => {
                if (isMounted && data.code === 200) {
                    const processedData = data.manageSSL.map(ManageSSL => [
                         ManageSSL.id,
                       ManageSSL.ssl_certificate,
                        ManageSSL.ssl_provider,
                         ManageSSL.ssl_expiry_date,
                    ]);
                    setManageSSLData(processedData);
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

    return { manageSSLData, loading, error, setManageSSLData };
}

export default useFetchManageSSL;
