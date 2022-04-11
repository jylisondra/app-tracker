import classnames from 'classnames';
import styles from './FormRow.module.css';

export default function FormRow({
  labelName,
  type,
  value,
  name,
  handleChange,
  className,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={classnames(
          styles.form_label,
          className === 'add_job' ? styles.addJob : ''
        )}
      >
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
