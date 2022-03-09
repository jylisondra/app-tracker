import { useState } from 'react';
import styles from './Register.module.css';
import FormRow from '../../components/formRow/FormRow';
import Alert from '../../components/alert/Alert';
import { useAppContext } from '../../context/AppContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

export default function Register() {
  const [values, setValues] = useState(initialState);
  // global state
  const { isLoading, showAlert, displayAlertDanger } = useAppContext();

  const toggleStatus = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlertDanger();
      return;
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.card}>
        <span className={styles.logo}>AppTrak.</span>
        {values.isMember ? <h1>Login</h1> : <h1>Register</h1>}
        {showAlert && <Alert />}
        {!values.isMember && (
          <>
            <label htmlFor="name" className={styles.form_label}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={styles.form_input}
            />
          </>
        )}
        <label htmlFor="email" className={styles.form_label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={styles.form_input}
        />
        <label htmlFor="password" className={styles.form_label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={styles.form_input}
        />
        <button className={`${styles.btn_submit} ${styles.btn}`}>Submit</button>
        {values.isMember ? (
          <p>
            Not signed up?
            <button
              type="button"
              onClick={toggleStatus}
              className={`${styles.btn_toggle} ${styles.btn} ${styles.btn_link}`}
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already signed up?
            <button
              type="button"
              onClick={toggleStatus}
              className={`${styles.btn_toggle} ${styles.btn} ${styles.btn_link}`}
            >
              Login
            </button>
          </p>
        )}
        <p>
          Try out as
          <button
            type="button"
            className={`${styles.btn_link} ${styles.btn_guest} ${styles.btn}`}
          >
            Guest
          </button>
        </p>
      </div>
    </form>
  );
}
