import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import Job from '../job/Job';

import SyncLoader from 'react-spinners/SyncLoader';
import styles from './JobsContainer.module.css';

export default function JobsContainer() {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();
  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <SyncLoader color="#9c7cf6" loading="true" />;
  }

  if (jobs.length === 0) {
    return <h2>No Jobs Founds</h2>;
  }

  return (
    <div>
      <h3>
        {totalJobs} Job{jobs.length > 1 && 's'} Found
      </h3>
      <div className={styles.jobs_container}>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </div>
  );
}
