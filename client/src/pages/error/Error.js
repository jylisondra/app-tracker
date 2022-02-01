import error from '../../assets/images/error.svg';

//styles
import styles from './Error.module.css';

export default function Error() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404 Page Not Found</h1>
      <div className="img">
        <img src={error} alt="error" className={styles.img} />
      </div>
    </main>
  );
}
