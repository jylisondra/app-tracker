import styles from './FormRow.module.css';

export default function FormRow({
  labelName,
  type,
  value,
  name,
  handleChange,
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
