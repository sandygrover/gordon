// import { useState } from 'react';
// import { Button, Input, Icon, Form, Divider, Image } from 'semantic-ui-react';
// import { Formik } from 'formik';
// import * as yup from 'yup';

// import {GoogleLogin} from 'react-google-login'
// import FacebookLogin from 'react-facebook-login';
// import { Link, useHistory } from 'react-router-dom';
// import styles from './LoginForm.module.scss';

// const validationSchema = yup.object({
//   // email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
//   // password: yup
//   //   .string('Enter your password')
//   //   .min(8, 'Password should be of minimum 6 characters length')
//   //   .required('Password is required')
// });

// function LoginForm() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState();

//   const PostData = async (e) => {
//     e.preventDefault();

//     console.log(email)
//     console.log(password)
//     history.push('/home')
//   }

//   const [showPassword, setShowPassword] = useState(false);
//   let history = useHistory();

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const responseGoogle=(response) => {
//     console.log(response);
//     history.push('/home');
//   }

//   const handleLogin =(response) => {
//     console.log(response);
//     history.push('/');
//   }

//   const responseFacebook=(response) => {
//     console.log("login result" , response);
//   }

//   const componentClicked =(data) => {
//     console.log(data);
//   }

//   return (
//     <div>
//       <div className="logo-text"><Image src={process.env.PUBLIC_URL + '/images/Friday.png'} style={{width:'50%  '}} /></div>
//       <div className="logo_tag">Create Amazing Content</div>
//       <p>Dive into the ABC with your free account and start earning between $1,499 to $7,495 per month.</p>
//       <Formik
//         initialValues={{
//           email: '',
//           password: ''
//         }}
//         validationSchema={validationSchema}
//         // validateOnChange={false}
//         validateOnBlur={true}
//         onSubmit={(values, actions) => {
//           setTimeout(() => {
//             console.log(values);
//             // just a place holder for axios request
//             history.push('/home');
//           }, 1500);
//         }}
//       >
//         {({ touched, errors, onChange,values, handleBlur,  handleSubmit, isSubmitting }) => (
//           <Form onSubmit={handleSubmit}>
//             <Form.Field>
//               <Input
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={styles.borderBottom}
//                 onBlur={handleBlur}
//                 // validateOnChange={handleChange}
//                 // onChange={handleChange}
//                 error={!!touched.email && !!errors.email}
//                 placeholder="Email"
//               />
//               {errors.email && touched.email && <span className={'error-text'}>{errors.email}</span>}
//             </Form.Field>
//             <Form.Field>
//               <Input
//                 icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link onClick={handleTogglePassword} />}
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 // onChange={handleChange}
//                 // validateOnChange={handleChange}
//                 onBlur={handleBlur}
//                 error={!!touched.password && !!errors.password}
//                 className={styles.borderBottom}
//                 placeholder="Password"
//               />
//               {errors.password && touched.password && <span className={'error-text'}>{errors.password}</span>}
//             </Form.Field>
//             <p className={styles.forgotLink}>
//               {/* <a>Fogot Password?</a> */}
//               <Link to="/forgot-password">Fogot Password?</Link>
//             </p>
//             <Button
//               disabled={isSubmitting}
//               loading={isSubmitting}
//               onClick={PostData}
//               className={styles.button_fluid}
//               primary
//               type="submit"
//             >
//               Login
//             </Button>
//           </Form>
//         )}
//       </Formik>
//       <Divider horizontal>Or</Divider>
//       <GoogleLogin  type="submit"
//         className={styles.button_social}

//         clientId="920869882108-cf236hmg7903ol77gp3gj9vjnus5a787.apps.googleusercontent.com"
//         onSuccess={responseGoogle}
//         onFailure={handleLogin}

//         cookiePolicy={'single_host_origin'}
//         buttonText={<h4>Login with Google</h4>}
//         />
//         {/* <Image src={process.env.PUBLIC_URL + '/images/google-icon.png'} avatar /> Login with Google */}
//       {/* </Button> */}
//       {/* <Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} avatar />
//         Login with Facebook */}
//       <FacebookLogin
//       cssClass={styles.myfacebookbuttonclass}
//        type="submit"

//         appId="185749406856002"
//         fields="name, email, picture" onClick={componentClicked} callback={responseFacebook} autLoad={true}
//        icon={<Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} style={{innerWidth: '100%'}}/>}
//        textButton = {<h4>Login with Facebook</h4>}
//        />

//       {/* </Button> */}

//       <p className={styles.textLink}>
//         New to ABC? <Link to="/sign-up">Sign Up</Link>
//       </p>
//     </div>
//   );
// }

// export default LoginForm;

import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Input, Icon, Form, Divider, Image } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { osName, browserName } from 'react-device-detect';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link, useHistory } from 'react-router-dom';
import styles from './LoginForm.module.scss';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 6 characters length')
    .required('Password is required')
});

function LoginForm() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState();

  // const PostData = async (e) => {
  //   e.preventDefault();

  //   console.log(email)
  //   console.log(password)
  //   history.push('/home')
  // }

  const [showPassword, setShowPassword] = useState(false);
  let history = useHistory();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const responseGoogle = (response) => {
    console.log(response);
    history.push('/home');
  };

  const handleLogin = (response) => {
    console.log(response);
    history.push('/');
  };

  const responseFacebook = (response) => {
    console.log('login result', response);
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  const loginSession = () => {
    axios({
      method: 'post',
      url: 'http://3.129.45.198/api/auth/add-session',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        device: osName + ' ' + browserName
      }
    })
      .then(function (response) {})
      .catch((res) => {});
  };

  return (
    <div>
      <div className="logo-text">
        <Image src={process.env.PUBLIC_URL + '/images/Friday.png'} style={{ width: '50%  ' }} />
      </div>
      <div className="logo_tag">Create Amazing Content</div>
      <p>Dive into the FNT with your free account and start earning between €1,499 to €7,495 per month.</p>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        // validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values, actions) => {
          axios({
            method: 'post',
            url: 'http://3.129.45.198/api/auth/login',
            data: {
              email: values.email,
              password: values.password
            },
          }).then(function(response) {
              if(response.data.status) {
                    localStorage.setItem('is_login', true);
                    localStorage.setItem('token', response.data.data[0].token);
                    localStorage.setItem('userId', response.data.data[0].id);
                    localStorage.setItem('name', response.data.data[0].name);
                    localStorage.setItem('username', response.data.data[0].username);
                    localStorage.setItem('email', response.data.data[0].email);
                    localStorage.setItem('phone_number', response.data.data[0].phone_number);
                    localStorage.setItem('website', response.data.data[0].website);
                    localStorage.setItem('subscription_fee', response.data.data[0].subscription_fee);
                    localStorage.setItem('location', response.data.data[0].location);
                    localStorage.setItem('profile', response.data.data[0].profile);
                    localStorage.setItem('role', response.data.data[0].role);
                    loginSession();
                    Swal.fire({
                      title: 'Success',
                      text: response.data.message,
                      icon: 'success'
                    }).then(() => {
                      setTimeout(() => {
                        history.push('/home');
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
            })
            .catch((res) => {
              window.location.reload(false);
            });
        }}
      >
        {({ touched, errors, onChange, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                name="email"
                type="email"
                value={values.email}
                // onChange={(e) => setEmail(e.target.value)}
                className={styles.borderBottom}
                onBlur={handleBlur}
                // validateOnChange={handleChange}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                placeholder="Email"
              />
              {errors.email && touched.email && <span className={'error-text'}>{errors.email}</span>}
            </Form.Field>
            <Form.Field>
              <Input
                icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link onClick={handleTogglePassword} />}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handleChange}
                // validateOnChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                className={styles.borderBottom}
                placeholder="Password"
              />
              {errors.password && touched.password && <span className={'error-text'}>{errors.password}</span>}
            </Form.Field>
            <p className={styles.forgotLink}>
              {/* <a>Fogot Password?</a> */}
              <Link to="/forgot-password">Fogot Password?</Link>
            </p>
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              // onClick={PostData}
              className={styles.button_fluid}
              primary
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Divider horizontal>Or</Divider>
      <GoogleLogin
        type="submit"
        className={styles.button_social}
        clientId="920869882108-cf236hmg7903ol77gp3gj9vjnus5a787.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        buttonText={<h4>Login with Google</h4>}
      />
      {/* <Image src={process.env.PUBLIC_URL + '/images/google-icon.png'} avatar /> Login with Google */}
      {/* </Button> */}
      {/* <Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} avatar />
        Login with Facebook */}
      <FacebookLogin
        cssClass={styles.myfacebookbuttonclass}
        type="submit"
        appId="185749406856002"
        fields="name, email, picture"
        onClick={componentClicked}
        callback={responseFacebook}
        autLoad={true}
        icon={<Image src={process.env.PUBLIC_URL + '/images/facebook-icon.png'} style={{ innerWidth: '100%' }} />}
        textButton={<h4>Login with Facebook</h4>}
      />

      {/* </Button> */}

      <p className={styles.textLink}>
        New to FNT ? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginForm;
