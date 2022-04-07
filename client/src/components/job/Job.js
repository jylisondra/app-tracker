import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import classnames from 'classnames';
import moment from 'moment';
import {
  FaLocationArrow,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBriefcase,
} from 'react-icons/fa';
import styles from './Job.module.css';

export default function Job({
  company,
  position,
  location,
  dateApplied,
  status,
  companyURL,
  jobType,
}) {
  let date = moment(dateApplied);
  date = date.format('MMM Do, YYYY');

  const handleClick = () => {
    let url = companyURL;
    let pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) {
      url = 'http://' + url;
    }
    window.open(url);
  };
  return (
    <div className={styles.card}>
      <div
        className={classnames(
          styles.banner,
          status === 'pending'
            ? styles.banner_pending
            : status === 'interviewing'
            ? styles.banner_interview
            : styles.banner_rejected
        )}
      >
        {status}
      </div>
      <div className={styles.title}>
        {/*<div className={styles.logo}>{company.charAt(0)}</div>}*/}
        <h2 className={styles.company}>{company}</h2>
        <p className={styles.position}>{position}</p>
      </div>
      <hr />
      <div className={styles.description_container}>
        <div className={styles.description}>
          <FaLocationArrow />
          <p>{location}</p>
        </div>
        <div className={styles.description}>
          <FaCalendarAlt />
          <p>{date}</p>
        </div>
        <div className={styles.description}>
          <FaBriefcase />
          <p>{jobType}</p>
        </div>
        {companyURL !== '' && (
          <div className={styles.description}>
            <FaExternalLinkAlt />
            <button onClick={handleClick}>Company Site</button>
          </div>
        )}
      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn_edit}>Edit</button>
        <button className={styles.btn_delete}>Delete</button>
      </div>
    </div>
  );
}
