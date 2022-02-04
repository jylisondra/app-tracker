import styles from './FormRow.module.css';

export default function FormRow({
  type,
  value,
  name,
  handleChange,
  labelName,
  className,
}) {
  return (
    <div className={`${styles[className]}`}>
      <label
        htmlFor={name}
        className={`${styles[className]} ${styles.form_label}`}
      >
        {labelName || name}
      </label>
      <input
        className={`${styles[className]} ${styles.form_input}`}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
