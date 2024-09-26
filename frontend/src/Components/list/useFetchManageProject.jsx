import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchManageProject = () => {
  const [manageProjectData, setManageProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/manage_project')
      .then(({ data }) => {
        if (isMounted && data.code === 200) {
          const processedData = data.ManageProject.map(ManageProjects => [
            ManageProjects.id,
            ManageProjects.projName,
            ManageProjects.clientName,
            ManageProjects.projDuration,
          ]);
          setManageProjectData(processedData);
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

  return { manageProjectData, loading, error, setManageProjectData };
};

export default useFetchManageProject;
