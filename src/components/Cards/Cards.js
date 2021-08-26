import CardForm from '../forms/CardForm/CardForm';
import styles from './Cards.module.scss';

function Cards() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.cards}>
          <CardForm />
        </div>
        <div className={styles.right}> </div>
      </div>
    </div>
  );
}

export default Cards;
