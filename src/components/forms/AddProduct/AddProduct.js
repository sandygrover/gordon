import { Form } from 'semantic-ui-react';
import styles from './AddProduct.module.scss';

function AddShopList() {
  return (
    <div className={styles.AddCard}>
      <div className={styles.info_block}>
        <Form>
          <div className={styles.image_picker}>
            + <span>Add more</span>
          </div>
          <Form.Field>
            <label className={styles.label}>Product Description</label>
            <input className={styles.input} placeholder="Product Description" />
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Product Price</label>
            <input className={styles.input} placeholder="$100" />
          </Form.Field>
        </Form>
      </div>
    </div>
  );
}

export default AddShopList;
