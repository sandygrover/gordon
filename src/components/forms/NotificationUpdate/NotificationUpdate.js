import { Form, Checkbox } from 'semantic-ui-react';
import styles from './NotificationUpdate.module.scss';

function NotificationUpdate() {
  return (
    <div className={styles.form}>
      <Form>
        <Form.Field className={styles.inline_toggle}>
          <label>Send Notification on Email</label>
          <Checkbox defaultChecked toggle />
        </Form.Field>
        <Form.Field>
          <label className={styles.label}>Your Email</label>
          <input placeholder="Email" defaultValue="JuliaClark123@gmail.com" />
        </Form.Field>
      </Form>
    </div>
  );
}

export default NotificationUpdate;
