import Posts from '../Posts/Posts';
import Suggestions from '../Suggestions/Suggestions';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.wall}>
          <Posts />
        </div>
        <div className={styles.right}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default Home;
