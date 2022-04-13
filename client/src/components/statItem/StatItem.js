import { FaRegFlag, FaBusinessTime, FaRegThumbsDown } from 'react-icons/fa';

import styles from './StatItem.module.css';

export default function StatItem({ title, count, icon }) {
  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.count}>{count}</p>
    </div>
  );
}
