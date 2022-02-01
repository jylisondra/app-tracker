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
    <form onSubmit={handleSubmit}>
      {memberStatus ? <h1>Login</h1> : <h1>Register</h1>}
      {!memberStatus && <label htmlFor="name">Name</label>}
      {!memberStatus && <input type="text" name="name" />}
      <label htmlFor="email">Email</label>
      <input type="text" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Submit</button>
      {memberStatus ? (
        <p>
          Not signed up?<button onClick={toggleStatus}>Register</button>
        </p>
      ) : (
        <p>
          Already signed up?
          <button onClick={toggleStatus}>Login</button>
        </p>
      )}
    </form>
  );
}
