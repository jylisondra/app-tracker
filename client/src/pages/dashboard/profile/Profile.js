import { useState } from 'react';
import FormRow from '../../../components/formRow/FormRow';
import Alert from '../../../components/alert/Alert';
import { useAppContext } from '../../../context/AppContext';

import styles from './Profile.module.css';

export default function Profile() {
  const { user, showAlert, displayAlertDanger, updateUser, isLoading } =
    useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      displayAlertDanger();
      return;
    }

    updateUser({ firstName, lastName, email });
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Profile</h2>
        {showAlert && <Alert />}
        <div className={styles.form_center}>
          <FormRow
            labelName="First Name"
            type="text"
            name="firstName"
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <FormRow
            labelName="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            labelName="Email"
            type="text"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className={styles.btn_submit}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Please Wait...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
}
