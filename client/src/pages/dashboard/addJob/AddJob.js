import { Link } from 'react-router-dom';
import FormRow from '../../../components/formRow/FormRow';
import FormRowSelect from '../../../components/formRowSelect/FormRowSelect';
import Alert from '../../../components/alert/Alert';
import { useAppContext } from '../../../context/AppContext';

import styles from './AddJob.module.css';

export default function AddJob() {
  const {
    company,
    position,
    location,
    dateApplied,
    statusOptions,
    status,
    companyURL,
    jobType,
    jobTypeOptions,
    isFavorite,
    isEditing,
    editJob,
    showAlert,
    displayAlertDanger,
    handleChange,
    createJob,
    clearValues,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !location || !dateApplied) {
      displayAlertDanger();
      return;
    }
    if (isEditing) {
      console.log('edit');
      editJob();
    } else {
      createJob();
    }
    clearValues();
  };

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{isEditing ? 'Edit Job' : 'Add Job'}</h2>
        {showAlert && <Alert />}
        <div className={styles.form_center}>
          <FormRow
            labelName="Company"
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            labelName="Position"
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            labelName="Location"
            type="text"
            name="location"
            value={location}
            handleChange={handleJobInput}
          />
          <FormRow
            labelName="Date Applied"
            type="date"
            name="dateApplied"
            value={dateApplied}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelName="Status"
            name="status"
            value={status}
            list={statusOptions}
            className="add_job"
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelName="Job Type"
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            className="add_job"
            handleChange={handleJobInput}
          />
          <FormRow
            labelName="Company URL - Optional"
            type="text"
            name="companyURL"
            value={companyURL}
            handleChange={handleJobInput}
          />
        </div>
        <button className={`${styles.btn} ${styles.btn_submit}`} type="submit">
          Submit
        </button>
        <Link
          className={`${styles.btn} ${styles.link}`}
          onClick={() => clearValues()}
          to={{
            pathname: '/jobs/',
            state: {
              isEditing: false,
            },
          }}
        >
          Cancel
        </Link>
      </form>
    </>
  );
}
