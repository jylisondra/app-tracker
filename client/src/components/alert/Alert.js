import { useAppContext } from '../../context/AppContext';

import styles from './Alert.module.css';

export default function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div class={`${styles.alert} ${styles.alert_}${alertType} `}>
      {alertText}
    </div>
  );
}
