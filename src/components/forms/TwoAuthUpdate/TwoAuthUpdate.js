import { Form, Checkbox } from 'semantic-ui-react';
import styles from './TwoAuthUpdate.module.scss';

function TwoAuthUpdate() {
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Authentication</h3>
      <Form>
        <Form.Field className={styles.inline_toggle}>
          <label>Verification via SMS</label>
          <Checkbox defaultChecked toggle />
        </Form.Field>
        <Form.Field className={styles.inline_toggle}>
          <label>Verification via Face ID</label>
          <Checkbox defaultChecked toggle />
        </Form.Field>
      </Form>
    </div>
  );
}

export default TwoAuthUpdate;
