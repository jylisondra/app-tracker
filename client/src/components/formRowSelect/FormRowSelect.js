import styles from './FormRowSelect.module.css';

export default function FormRowSelect({
  labelName,
  name,
  value,
  handleChange,
  list,
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
        className={styles.form_select}
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
