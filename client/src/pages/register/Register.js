import { useState } from 'react';

// stylces
import styles from './Register.module.css';

export default function Register() {
  const [memberStatus, setStatus] = useState(true);

  const toggleStatus = () => setStatus((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.card}>
        <span className={styles.logo}>AppTrak.</span>
        {memberStatus ? <h1>Login</h1> : <h1>Register</h1>}
        {!memberStatus && (
          <label htmlFor="name" className={styles.form_label}>
            Name
          </label>
        )}
        {!memberStatus && (
          <input type="text" name="name" className={styles.form_input} />
        )}
        <label htmlFor="email" className={styles.form_label}>
          Email
        </label>
        <input type="text" name="email" className={styles.form_input} />
        <label htmlFor="password" className={styles.form_label}>
          Password
        </label>
        <input type="password" name="password" className={styles.form_input} />
        <button className={`${styles.btn_submit} ${styles.btn}`}>Submit</button>
        {memberStatus ? (
          <p>
            Not signed up?
            <button
              onClick={toggleStatus}
              className={`${styles.btn_toggle} ${styles.btn}`}
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already signed up?
            <button
              onClick={toggleStatus}
              className={`${styles.btn_toggle} ${styles.btn}`}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </form>
  );
}
