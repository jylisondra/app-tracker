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
    listingURL,
    isFavorite,
    isEditing,
    showAlert,
    displayAlertDanger,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !location || !dateApplied) {
      displayAlertDanger();
      return;
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
  };

  return (
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
          handleChange={handleJobInput}
        />
        <FormRow
          labelName="Company URL"
          type="text"
          name="companyURL"
          value={companyURL}
          handleChange={handleJobInput}
        />
        <FormRow
          labelName="Listing URL"
          type="text"
          name="listingURL"
          value={listingURL}
          handleChange={handleJobInput}
        />
        <button className={styles.btn_submit} type="submit">
          Submit
        </button>
        <Link to="/all-jobs">Cancel</Link>
      </div>
    </form>
  );
}
