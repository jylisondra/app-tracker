import classnames from 'classnames';
import styles from './FormRowSelect.module.css';

export default function FormRowSelect({
  labelName,
  name,
  value,
  handleChange,
  list,
  className,
}) {
  return (
    <div>
      <label htmlFor={name} className={styles.form_label}>
        {labelName}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={classnames(
          styles.form_select,
          className === 'add_job' ? styles.add_job : ''
        )}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
