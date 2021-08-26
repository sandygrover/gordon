import { Form } from 'semantic-ui-react';
import styles from './AddShopList.module.scss';

function AddShopList() {
  return (
    <div className={styles.AddCard}>
      <div className={styles.info_block}>
        <Form>
          <Form.Field>
            <label className={styles.label}>List Name</label>
            <input className={styles.input} placeholder="List Name" />
          </Form.Field>
        </Form>
      </div>
    </div>
  );
}

export default AddShopList;
