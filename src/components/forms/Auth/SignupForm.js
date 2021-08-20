
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Input, Message, Form, Divider, Image } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import { Link,useHistory } from 'react-router-dom';
import styles from './SignupForm.module.scss';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  name: yup
    .string('Enter your name')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Name is required')
});

function SignupForm() {

  const [role, SetRole] = useState('creator');

  const [submitSuccess, setSubmitSuccess] = useState(false);
  let history = useHistory();

  const responseGoogle=(response) => {
    console.log(response);
    history.push('/home')
  }

  const handleLogin =(response) => {
    console.log(response);
  }

  const responseFacebook=(response) => {
    console.log("login result" , response);
  }

  const componentClicked =(data) => {
    console.log(data);
  }



  return (
    <div>
      <div className="logo-text">
      <Image src={process.env.PUBLIC_URL + '/images/Friday.png'} style={{width:'50%'}}/>
      </div>
      <div className="logo_tag">Create Amazing Content</div>
      <p>Dive into the FNT with your free account and start earning between $1,499 to $7,495 per month.</p>
      {!submitSuccess && (
        <div>
          <Formik
            initialValues={{
              email: '',
              password: '',
              name: ''
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values, actions) => {
              axios({
                method: 'post',
                url: 'http://3.129.45.198/api/auth/register',
                data: {
                  email: values.email,
                  username: values.name,
                  password: values.password,
                  password_confirmation: values.password,
                  role: role
                },
              })
              .then(function(response) {
                  if(response.data.status) {
                    Swal.fire({
                      title: 'Success',
                      text: response.data.message,
                      icon: 'success'
                    }).then(() => {
                      setTimeout(() => {
                        history.push('/');
                      }, 1500);
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: response.data.message,
                      icon: 'warning'
                    }).then(() => {
                      actions.setSubmitting(false);
                    });
                  }
              }).catch(res => {
                window.location.reload(false);
              });

            }}
          >
            {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <Input
                    name="email"
                    className={styles.borderBottom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.email && !!errors.email}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && <span className={'error-text'}>{errors.email}</span>}
                </Form.Field>
                <Form.Field>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.password && !!errors.password}
                    className={styles.borderBottom}
                    placeholder="Password"
                  />
                  {errors.password && touched.password && <span className={'error-text'}>{errors.password}</span>}
                </Form.Field>
                <Form.Field>
                  <Input
                    name="name"
                    className={styles.borderBottom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    placeholder="Name"
                  />
                  {errors.name && touched.name && <span className={'error-text'}>{errors.name}</span>}
                </Form.Field>
                <Form.Field>
                  <Input
                    name="role"
                    type="radio"
                    value="creator"
                    className={styles.borderBottom}
                    onChange={() => {
                      SetRole('creator')
                    }}
                    onBlur={handleBlur}
                    placeholder="Role"
                  />
                  {<span>Creator</span>}
                  <Input
                    name="role"
                    type="radio"
                    value="viewer"
                    className={styles.borderBottom}
                    onChange={() => {
                      SetRole('viewer')
                    }}
                    onBlur={handleBlur}
                    placeholder="Role"
                  />
                  {<span>Viewer</span>}
                </Form.Field>
                <p className={styles.forgotLink}>
                  <Link to="/forgot-password">Fogot Password?</Link>
                </p>
                <Button
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className={styles.button_fluid}
                  primary
                  type="submit"
                >
                  Sign Up
                </Button>
                <p className={styles.textLink__sm}>
                  By singing up you agree to our <Link to="/">Term of Services</Link> and{' '}
                  <Link to="/">Privacy Policy</Link> and confirm that you are at least 18 years old.
                </p>
              </Form>
            )}
          </Formik>

          <Divider horizontal>Or</Divider>
          <GoogleLogin  type="submit"
        className={styles.button_social}

        clientId="920869882108-cf236hmg7903ol77gp3gj9vjnus5a787.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={handleLogin}

        cookiePolicy={'single_host_origin'}
        buttonText={<h4>Login with Google</h4>}
        />
        <FacebookLogin
      cssClass={styles.myfacebookbuttonclass}
       type="submit"

        appId="185749406856002"
        fields="name, email, picture" onClick={componentClicked} callback={responseFacebook} autLoad={true}
       icon={<Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} style={{innerWidth: '100%'}}/>}
       textButton = {<h4>Login with Facebook</h4>}
       />

          {/* <Button className={styles.button_social} type="submit">
            <Image src={process.env.PUBLIC_URL + '/images/google-icon.png'} avatar /> Sign up with Google
          </Button> */}
          {/* <Button className={styles.button_social} type="submit">
            <Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} avatar />
            Sign up with Facebook
          </Button> */}

          <p className={styles.textLink}>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>
      )}
      {submitSuccess && (
        <Message
          info
          header="Verify your account"
          content="Thank you for choosing FNT. Please verify your e-mail address to finish signing up for FNT."
        />
      )}
    </div>
  );
}

export default SignupForm;
