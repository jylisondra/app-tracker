import { useAppContext } from '../../context/AppContext';
import StatItem from '../statItem/StatItem';
import styles from './StatsContainer.module.css';

export default function StatsContainer() {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
    },
    {
      title: 'interviewing',
      count: stats.interviewing || 0,
    },
    {
      title: 'jobs declined',
      count: stats.rejected || 0,
    },
  ];
  return (
    <div className={styles.stats_container}>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </div>
  );
}
