import { useAppContext } from '../../context/AppContext';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import classnames from 'classnames';

import styles from './PageBtnContainer.module.css';

export default function PageBtnContainer() {
  const { numPages, page, changePage } = useAppContext();

  // creates an array of page numbers
  const pages = Array.from({ length: numPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numPages) {
      newPage = numPages;
    }
    changePage(newPage);
  };

  return (
    <div className={styles.page_btn_container}>
      <button className={styles.btn_arrow} onClick={prevPage}>
        <RiArrowDropLeftLine />
      </button>
      <div className={styles.page_num_container}>
        {pages.map((pageNum) => {
          return (
            <button
              className={classnames(
                styles.page_btn,
                pageNum === page ? styles.active : ''
              )}
              type="button"
              key={pageNum}
              onClick={() => changePage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button className={styles.btn_arrow} onClick={nextPage}>
        <RiArrowDropRightLine />
      </button>
    </div>
  );
}
