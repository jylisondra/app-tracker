import { useAppContext } from '../../context/AppContext';
import StatItem from '../statItem/StatItem';
import { FaFlag, FaBusinessTime, FaTimes } from 'react-icons/fa';
import styles from './StatsContainer.module.css';

export default function StatsContainer() {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaFlag />,
    },
    {
      title: 'companies interviewing',
      count: stats.interviewing || 0,
      icon: <FaBusinessTime />,
    },
    {
      title: 'jobs declined',
      count: stats.rejected || 0,
      icon: <FaTimes />,
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
