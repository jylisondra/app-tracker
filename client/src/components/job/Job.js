import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import classnames from 'classnames';
import moment from 'moment';
import {
  FaLocationArrow,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBriefcase,
} from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styles from './Job.module.css';

export default function Job({
  _id,
  company,
  position,
  location,
  dateApplied,
  status,
  companyURL,
  jobType,
  isFavorite,
}) {
  const { setEditJob, deleteJob, toggleFavorite } = useAppContext();
  const [confirmDelete, setConfirmDelete] = useState(false);
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

  const toggleConfirm = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleToggleFavorite = (e) => {
    console.log(e.target);
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
        {/*<button onClick={handleToggleFavorite} className={styles.favorite}>
          {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
        </button>*/}
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
        <Link
          to={{
            pathname: '/jobs/create',
            state: {
              isEditing: true,
            },
          }}
          onClick={() => setEditJob(_id)}
          className={`${styles.btn} ${styles.btn_edit}`}
        >
          Edit
        </Link>
        {!confirmDelete ? (
          <button
            className={`${styles.btn} ${styles.btn_delete}`}
            onClick={toggleConfirm}
          >
            Delete
          </button>
        ) : (
          <div className={styles.confirm_container}>
            <button
              className={`${styles.btn} ${styles.btn_confirm}`}
              onClick={() => deleteJob(_id)}
            >
              Confirm
            </button>
            <button
              className={`${styles.btn} ${styles.btn_cancel}`}
              onClick={toggleConfirm}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
