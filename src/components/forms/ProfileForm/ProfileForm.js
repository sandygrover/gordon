import Swal from 'sweetalert2';
import { Image, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import styles from './ProfileForm.module.scss';

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
      name: event.target.elements.name.value,
      phone_number: localStorage.getItem('phone_number'),
      email: localStorage.getItem('email'),
      subscription_fee: event.target.elements.subscription_fee.value,
      location: event.target.elements.location.value == undefined ? '' : event.target.elements.location.value,
      website: event.target.elements.website.value == undefined ? '' : event.target.elements.website.value,
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
          text: response.data.message,
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

function ProfileForm() {
  const successAlert = () => {
    Swal.fire({
        title: 'successful',
        text: 'Your profile has been updated.',
        icon: 'success'
      });
}


  return (
    <div className={styles.ProfileForm}>
      <div className={styles.hero_wrap}>
        <div className={styles.hero} style={{ backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/19.png)' }}>
          <div className={styles.user}>
            <Image
              className={styles.avatar}
              src={localStorage.getItem('profile') == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : localStorage.getItem('profile')}
              size="tiny"
              circular
              verticalAlign="middle"
            />
            <div className={styles.name}>{ localStorage.getItem('username') }</div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label className={styles.label}>User Name</label>
            <input required="required" name="username" placeholder="User Name" defaultValue={localStorage.getItem('username')} />
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Display Name</label>
            <input required="required" name="name" placeholder="Display Name" defaultValue={localStorage.getItem('name')} />
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Subscription Price</label>
            <input required="required" placeholder="Subscription Price" name="subscription_fee" defaultValue={localStorage.getItem('subscription_fee') ==  "null" ? '' : localStorage.getItem('subscription_fee')} />
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Location</label>
            <input required="required" placeholder="Location" name="location" defaultValue={localStorage.getItem('location') == "null" ? '' : localStorage.getItem('location')} />
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Website</label>
            <input required="required" placeholder="Website" name="website" defaultValue={localStorage.getItem('website') == "null" ? "" : localStorage.getItem('website')} />
          </Form.Field>
           <div className={styles.button_submit}>
            <Button primary >Update Profile</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}


export default ProfileForm;
