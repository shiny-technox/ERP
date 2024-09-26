import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const useFetchScheduleInterview = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axiosClient.get('/schedule-interview')
      .then(({ data }) => {
        if (isMounted && data.code === 200) {
          const processedData = data.ScheduleInterview.map(scheduleInterviews => [
            scheduleInterviews.id,
            scheduleInterviews.interviewer_name,
            scheduleInterviews.interviewer_email,
            scheduleInterviews.interviewer_phone,
            scheduleInterviews.interview_schedule_date,
            scheduleInterviews.interview_schedule_time
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

export default useFetchScheduleInterview;
