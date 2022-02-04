import styles from './FormRow.module.css';

export default function FormRow({
  type,
  value,
  name,
  handleChange,
  labelName,
}) {
  return (
    <div>
      <label htmlFor={name} className={`${styles.form_label}`}>
        {labelName || name}
      </label>
      <input
        className={`${styles.form_input}`}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
