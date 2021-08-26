import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './SubscriptionUpdate.module.scss';

function SubscriptionUpdate({ activeLink }) {
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Subscription</h3>
      <Form>
        <Form.Field>
        <select name="Subscription Price " multiple="" class="ui fluid dropdown">
  <option value=""> Subscription Price </option>
<option value="angular"> Free </option>
<option value="css"> €5 </option>
<option value="css"> €10 </option>
<option value="css"> €30 </option>
<option value="design">€50</option>

</select>
          <p>Minimum €4.99 Euro or Free</p>
          <p>
            You must{' '}
            <strong>
              {' '}
              <Link to="/bank">add bank account</Link>{' '}
            </strong>
            before you set your price or accept tips
          </p>
        </Form.Field>

        <div className={styles.button_group}>
          <Button onClick={() => activeLink(false)} className={styles.btn_white}>
            Cancel
          </Button>{' '}
          <Button className={styles.btn_primary} primary>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SubscriptionUpdate;
