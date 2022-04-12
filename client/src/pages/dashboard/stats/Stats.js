import { useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import StatsContainer from '../../../components/statsContainer/StatsContainer';
import ChartsContainer from '../../../components/chartsContainer/ChartsContainer';

export default function Stats() {
  const { showStats, isLoading, monthlyApps } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApps.length > 0 && <ChartsContainer />}
    </>
  );
}
