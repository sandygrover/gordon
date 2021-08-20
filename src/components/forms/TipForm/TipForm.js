import { Header, Modal, Image, Input, TextArea, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './TipForm.module.scss';

function TipForm({ open = false, setOpen }) {
  return (
    <Modal
      className={styles.modal}
      closeIcon
      size={'mini'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content="Send Tip" />
      <Modal.Content>
        <div className={styles.send_to}>
          <p>Sent to</p>
          <div className={styles.profile}>
            <div className={styles.about}>
              <Image src={process.env.PUBLIC_URL + '/images/avatar/julia.png'} size="mini" alt="Juila" avatar />
              <div className={styles.user_status}>
                <strong>Julia</strong>
                <span>@juliaclark</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <Form>
            <Form.Field>
              <Input className={styles.input} placeholder="Tip Amount" />
            </Form.Field>

            <Form.Field>
              <TextArea className={styles.textarea} placeholder="Message" />
              <p className={styles.char_length}>0/100</p>
            </Form.Field>
            <div className={styles.button_group}>
              <span className={styles.btn_white} onClick={() => setOpen(false)}>
                Cancel
              </span>
              <Link to="/cards">Add a payment card</Link>
            </div>
          </Form>
        </div>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}

export default TipForm;
