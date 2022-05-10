import { Link } from 'react-router-dom';
import main from '../../assets/images/main.svg';

// styles
import styles from './Landing.module.css';

export default function landing() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1 className={styles.title}>AppTrak.</h1>
          <p className={styles.subtitle}>A Job Application Tracker</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis, voluptate, quis atque explicabo autem nam alias ipsum
            ex ratione beatae reprehenderit? Iste numquam veritatis dolore quo
            vel. Minus, animi inventore!
          </p>
          <Link to="/register" className={styles.btn}>
            Get Started Now
          </Link>
        </div>
        <div className={`${styles.main_img} ${styles.img}`}>
          <img src={main} alt="AppTrak" />
        </div>
      </div>
    </main>
  );
}
