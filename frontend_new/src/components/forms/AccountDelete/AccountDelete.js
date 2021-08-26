import Swal from 'sweetalert2';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './AccountDelete.module.scss';

function handleSubmit(event) {

  Swal.fire({
    title: 'Do you want to delete your account ?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: `Ok`
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: 'get',
        url: 'http://3.129.45.198/api/auth/delete-account',
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          old_password: event.target.elements.username.value
        },
      })
        .then(function(response) {

          localStorage.clear();
          Swal.fire({
            title: 'Success',
            text: 'Account Deleted Successfully',
            icon: 'success'
          }).then(() => {
            window.location.reload()
          });

      }).catch(res => {
        window.location.reload(false);
      });
    } else {

    }
  })
}

function AccountDelete() {
  const successAlert = () => {
    Swal.fire({
        title: 'successful',
        text: 'Your account has been deleted',
        icon: 'success'
      });
}
  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Delete Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label className={styles.label}>Enter Account name</label>
          <input placeholder="Account Name" name="username" defaultValue={localStorage.getItem('name')} />
        </Form.Field>

        <div className={styles.button_submit}>
          <Button primary>Delete Account</Button>
        </div>
      </Form>
    </div>
  );
}

export default AccountDelete;
