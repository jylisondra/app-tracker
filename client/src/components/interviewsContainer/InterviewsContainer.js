import { useAppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import PageBtnContainer from '../pageBtnContainer/PageBtnContainer';

import SyncLoader from 'react-spinners/SyncLoader';
import styles from './InterviewsContainer.module.css';
import Interview from '../interview/Interview';

export default function InterviewsContainer() {
  const { getInterviews, interviews, totalInterviews, isLoading, numPages } =
    useAppContext();

  useEffect(() => {
    getInterviews();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <SyncLoader color="#9c7cf6" loading="true" />
      </div>
    );
  }

  if (interviews.length === 0) {
    return <h2>No Interviews Founds</h2>;
  }

  return (
    <div>
      <h3 className={styles.result}>
        {totalInterviews} Interview{interviews.length > 1 && 's'} Found
      </h3>
      <div className={styles.jobs_container}>
        {interviews.map((interview) => {
          return <Interview key={interview._id} {...interview} />;
        })}
      </div>
      {numPages > 1 && <PageBtnContainer />}
    </div>
  );
}
