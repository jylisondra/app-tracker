import { useAppContext } from '../../context/AppContext';

import styles from './Alert.module.css';

export default function Alert() {
  const { alertType, alertText } = useAppContext();
  if (alertType === 'danger') {
    return (
      <div className={`${styles.alert} ${styles.alert_danger}`}>
        {alertText}
      </div>
    );
  } else {
    return (
      <div className={`${styles.alert} ${styles.alert_confirm}`}>
        {alertText}
      </div>
    );
  }
}
