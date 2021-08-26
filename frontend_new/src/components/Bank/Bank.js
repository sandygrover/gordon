import AddBankForm from '../forms/AddBank/AddBank';
import styles from './Bank.module.scss';

function Bank() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.post}>
          <AddBankForm />
        </div>
        <div className={styles.right}> </div>
      </div>
    </div>
  );
}

export default Bank;
