import Swal from 'sweetalert2';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import styles from './ChangeAccount.module.scss';

function handleSubmit(event) {
  axios({
    method: 'post',
    url: 'http://3.129.45.198/api/auth/update-profile',
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      username: event.target.elements.username.value,
      name: localStorage.getItem('name'),
      phone_number: localStorage.getItem('phone_number'),
      email: localStorage.getItem('email'),
      subscription_fee: localStorage.getItem('subscription_fee'),
      location: localStorage.getItem('location'),
      website: localStorage.getItem('website'),
      profile: ''
    },
  })
    .then(function(response) {
      if(response.data.status) {
        localStorage.setItem('name', response.data.data[0].name);
        localStorage.setItem('username', response.data.data[0].username);
        localStorage.setItem('website', response.data.data[0].website);
        localStorage.setItem('subscription_fee', response.data.data[0].subscription_fee);
        localStorage.setItem('location', response.data.data[0].location);

        Swal.fire({
          title: 'Success',
          text: 'UserName Updated Successfully',
          icon: 'success'
        }).then(() => {

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

function ChangeAccount() {
  const successAlert = () => {
    Swal.fire({
        title: 'successful',
        text: 'Your user name has been updated',
        icon: 'success'
      });
}
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>User Name</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label className={styles.label}>Enter Account name</label>
          <input name="username" required="required" placeholder="Account Name" defaultValue={localStorage.getItem('username')} />
        </Form.Field>

        <div className={styles.button_submit}>
          <Button primary >Update Account</Button>
        </div>
      </Form>
    </div>
  );
}

export default ChangeAccount;
