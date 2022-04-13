import BarChartComponent from '../BarChart';
import { useAppContext } from '../../context/AppContext';

import styles from './ChartsContainer.module.css';

export default function ChartsContainer() {
  const { monthlyApps: data } = useAppContext();
  return (
    <div className={styles.chart_container}>
      <h2 className={styles.title}>Monthly Applications</h2>
      <BarChartComponent data={data} />
    </div>
  );
}
