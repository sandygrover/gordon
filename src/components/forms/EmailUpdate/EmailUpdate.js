import Swal from 'sweetalert2';
import { Button, Form, Input } from 'semantic-ui-react';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './EmailUpdate.module.scss';
const validationSchema = yup.object({
  // email: yup
  //   .string('Enter your email')
  //   .email("Enter a valid email")
  //   .required('Email is required')
});

function EmailUpdate() {
  const successAlert = () => {
    Swal.fire({
        title: 'successful',
        text: 'Your email has been updated.',
        icon: 'success'
      });
}

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Email</h3>
      <Formik
        initialValues={{
          email:''
        }}
        validationSchema={validationSchema}
        validationOnChange={false}
        validationOnBlur={true}
        onSubmit={(values, actions) =>{

          axios({
            method: 'post',
            url: 'http://3.129.45.198/api/auth/update-profile',
            headers: {
              "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            },
            data: {
              username: localStorage.getItem('username'),
              name: localStorage.getItem('name'),
              phone_number: localStorage.getItem('phone_number'),
              email: values.email,
              subscription_fee: localStorage.getItem('subscription_fee'),
              location: localStorage.getItem('location'),
              website: localStorage.getItem('website'),
              profile: ''
            },
          })
            .then(function(response) {
              if(response.data.status) {
                localStorage.setItem('email', response.data.data[0].email);
                localStorage.setItem('name', response.data.data[0].name);
                localStorage.setItem('username', response.data.data[0].username);
                localStorage.setItem('website', response.data.data[0].website);
                localStorage.setItem('subscription_fee', response.data.data[0].subscription_fee);
                localStorage.setItem('location', response.data.data[0].location);

                Swal.fire({
                  title: 'Success',
                  text: 'Email Updated Successfully',
                  icon: 'success'
                }).then(() => {
                  actions.setSubmitting(false)
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: response.data.message,
                  icon: 'warning'
                }).then(() => {
                  actions.setSubmitting(false)
                });
              }
          }).catch(res => {
            window.location.reload(false);
          });


        }}
      >
        {({touched, errors, handleChange, handleBlur,handleSubmit, isSubmitting}) =>(
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label className={styles.label}>Your Email</label>
          <input required="required" placeholder="Email"
            // onChange={handleBlur}
            defaultValue={localStorage.getItem('email')}
            name="email"
           />
           {errors.email && touched.email && <span >{errors.email}</span>}
        </Form.Field>

        <div className={styles.button_submit}>
          <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          primary  >Update</Button>
        </div>
      </Form>
        )}
      </Formik>

    </div>
  );
}

export default EmailUpdate;
