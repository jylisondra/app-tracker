import { useAppContext } from '../../context/AppContext';
import FormRow from '../formRow/FormRow';
import FormRowSelect from '../formRowSelect/FormRowSelect';

import styles from './SearchContainer.module.css';

export default function SearchContainer() {
  const {
    search,
    searchStatus,
    statusOptions,
    sort,
    sortOptions,
    isLoading,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <div className={styles.search_container}>
      <form className={styles.search_form}>
        <FormRow
          labelName="Search Positions"
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelName="Status"
          name="searchStatus"
          value={searchStatus}
          handleChange={handleSearch}
          list={['all', ...statusOptions]}
        />
        <FormRowSelect
          labelName="Sort"
          name="sort"
          value={sort}
          handleChange={handleSearch}
          list={sortOptions}
        />
        <button
          className={styles.btn}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Clear Filters
        </button>
      </form>
    </div>
  );
}
