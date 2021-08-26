import React, {useState} from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import styles from './PasswordUpdate.module.scss';

function handleSubmit(event) {
  axios({
    method: 'post',
    url: 'http://3.129.45.198/api/auth/change_password',
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      old_password: event.target.elements.old_password.value,
      new_password: event.target.elements.new_password.value,
      confirm_password: event.target.elements.confirm_password.value
    },
  })
    .then(function(response) {
      if(response.data.status) {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success'
        }).then(() => {
          localStorage.clear();
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'warning'
        }).then(() => {

        });
      }
  }).catch(res => {
    window.location.reload(false);
  });
}

function PasswordUpdate() {
  const [disable, setDisable]= React.useState(false);
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Password</h3>
      <Form onSubmit={handleSubmit}>
      < Form.Field>
          <label className={styles.label}>Old Password</label>
          <input required="required" name="old_password" type="password" placeholder="Old Password" />
        </Form.Field>
        <Form.Field>
          <label className={styles.label}>New Password</label>
          <input required="required" name="new_password" type="password" placeholder="Password" />
        </Form.Field>
        <Form.Field>
          <label className={styles.label}>Confirm Password</label>
          <input required="required" name="confirm_password" type="password" placeholder="Confirm Password" />
        </Form.Field>
        {/* <div className={styles.button_submit}>
          <Button disabled={disable} onClick ={() =>setDisable(true)} primary>Save</Button>
        </div> */}
        <div className={styles.button_submit}>
          <Button primary>Save</Button>
        </div>
      </Form>
    </div>
  );
}

export default PasswordUpdate;
