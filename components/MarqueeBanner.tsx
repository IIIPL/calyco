import styles from './MarqueeBanner.module.css';

const BULLET = '\u2022';
const MARQUEE_TEXT = `SALE IS LIVE   ${BULLET}   SPEEDY DELIVERY   ${BULLET}   SALE IS LIVE   ${BULLET}   SPEEDY DELIVERY`;
const LOOP_COUNT = 4;

const MarqueeBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee} aria-label="Sale is live with speedy delivery">
        <div className={styles.track}>
          {Array.from({ length: LOOP_COUNT }).map((_, index) => (
            <span
              className={styles.message}
              key={`marquee-segment-${index}`}
              aria-hidden={index !== 0}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
