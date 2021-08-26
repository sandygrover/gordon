import { Header, Modal, Image, Input, TextArea, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useState }from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from './TipForm.module.scss';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_8WGyXi9xAGboHVEaAZiHkKzv");

function TipForm({ open = false, setOpen }) {
  let [responseData, setResponseData] = React.useState('');
  let fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      url: 'http://3.129.45.198/api/auth/get-card',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      setResponseData(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

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
              <Image src={localStorage.getItem('otherUserProfile') == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : localStorage.getItem('otherUserProfile')} size="mini" alt={localStorage.getItem('otherUserName')} avatar />
              <div className={styles.user_status}>
                <strong>{localStorage.getItem('otherUserName')}</strong>
                <span>@{localStorage.getItem('otherUserUserName')}</span>
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
              {
                (responseData[0] && responseData[0].card_number) ?
                <Button
                className={styles.button_fluid}
                primary
                type="submit"
                > Pay </Button> : <Link to="/cards">Add a payment card</Link>
              }
            </div>
          </Form>
        </div>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Modal>
  );
}

export default TipForm;
