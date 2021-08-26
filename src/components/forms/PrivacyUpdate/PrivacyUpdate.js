import { Form, Checkbox } from 'semantic-ui-react';
import styles from './PrivacyUpdate.module.scss';

function PrivacyUpdate() {
  return (
    <div className={styles.form}>
      <Form>
        <Form.Field className={styles.inline_toggle}>
          <label>Show Activity Status</label>
          <Checkbox defaultChecked toggle />
        </Form.Field>
        <Form.Field className={styles.inline_toggle}>
          <label>Show Subscription Offer</label>
          <Checkbox defaultChecked toggle />
        </Form.Field>
      </Form>
    </div>
  );
}

export default PrivacyUpdate;
