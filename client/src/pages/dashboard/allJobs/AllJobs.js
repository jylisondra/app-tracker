import SearchContainer from '../../../components/searchContainer/SearchContainer';
import JobsContainer from '../../../components/jobsContainer/JobsContainer';
import styles from './AllJobs.module.css';

export default function AllJobs() {
  return (
    <>
      <h1>AllJobs</h1>
      <SearchContainer />
      <JobsContainer />
    </>
  );
}
