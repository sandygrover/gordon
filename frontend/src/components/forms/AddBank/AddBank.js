
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Dropdown,Input, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './AddBank.module.scss';


const validationSchema = yup.object({
  name: yup.string('Enter your First Name')
           .min(3,'Enter your First Name')
            .required('First Name is required'),

 last: yup.string('Enter your Last Name')
            .min(3,'Enter your Last Name')
             .required('Last Name is required'),

 address: yup.string('Enter your Address ')
           .min(3,'Enter your Address ')
            .required('Address is required'),

 country: yup.string('Enter your Country Name')
           .min(3,'Enter your Country Name')
            .required('Country Name is required'),
 city: yup.string('Enter your City Name')
           .min(3,'Enter your City Name')
            .required('City Name is required'),


});

const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  { key: 'us', value: 'us', flag: 'us', text: 'United States' },
  { key: 'in', value: 'in', flag: 'in', text: 'India' }
];

let name = '';
let last = '';
let address = '';
let country = '';
let city = '';

function AddBank() {

  axios({
    method: 'get',
    url: 'http://3.129.45.198/api/auth/get-bank',
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      if(response.data.status) {
        if(response.data.data.length > 0) {
          name = response.data.data.first_name;
          last = response.data.data.last_name;
          address = response.data.data.address;
          country = response.data.data.country_id;
          city = response.data.data.city;
        }
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

  const [step, setStep] = useState(0);

  return (
    <div className={styles.AddBank}>
      <h4>Banking Details</h4>

      {step === 0 && (
        <div className={styles.country_block}>
          <Dropdown placeholder="Select your Country" fluid search selection options={countryOptions} />
          <div className={styles.button_right}>
            <Button onClick={() => setStep(1)} primary>
              Next
            </Button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <p className={styles.info_block}>
            <strong>Personal Information</strong>
          </p>
          <Formik
            initialValues={{
              name:'',
              last:'',
              address:'',
              country:'',
              city:''
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values,actions) => {
              const formData = new FormData();
              let requestData = {
                address:values.address,
                first_name:values.name,
                last_name:values.last,
                country_id:1,
                city:values.city
              };
              axios({
                method: 'post',
                url: 'http://3.129.45.198/api/auth/add-bank',
                headers: {
                  "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                  'Accept' : 'multipart/form-data',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify(requestData),
              })
              .then(function(response) {
                  if(response.data.status) {

                    Swal.fire({
                      title: 'Success',
                      text: response.data.message,
                      icon: 'success'
                    }).then(() => {
                      // window.location.reload();
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
            }}>
          {({ touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label className={styles.label}>First Name</label>
              <Input placeholder="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="name"
              name="name"
              defaultValue={name}
              error={!!touched.name && !!errors.name} />
              {errors.name && touched.name && <span>{errors.name}</span>}
            </Form.Field>


            <Form.Field>
              <label className={styles.label}>Last Name</label>
              <Input placeholder="Last Name"
              onBlur={handleBlur}
              type="last"
              name="last"
              onChange={handleChange}
              error={!!touched.last && !!errors.last}
               />
              {errors.last && touched.last && <span>{errors.last}</span>}
            </Form.Field>


            <Form.Field>
              <label className={styles.label}>Address</label>
              <Input
              type="address"
              name="address"
              placeholder="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.address && !!errors.address}
              />
              {errors.address && touched.address && <span>{errors.address}</span>}
            </Form.Field>



            <Form.Field>
              <label className={styles.label}>Country</label>
              <Input
              type="country"
              name="country"
              placeholder="Country"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.country && !!errors.country}
              />
              {errors.country && touched.country && <span>{errors.country}</span>}
            </Form.Field>


            <Form.Field>
              <label className={styles.label}>City</label>
              <Input
              type="city"
              name="city"
              placeholder="City"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.city && !!errors.city}
              />
              {errors.city && touched.city && <span>{errors.city}</span>}
            </Form.Field>


            <div className={styles.button_submit}>
              <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              //  onClick={() => setStep(2)}
                primary>
                Send for approval
              </Button>
            </div>
          </Form>
             )}
             </Formik>
        </div>
      )}
      {step === 2 && (
        <div className={styles.submit_block}>
          <h4>Your account is being approved</h4>
          <p>Please allow 24 hrs to review your account</p>
        </div>
      )}
    </div>
  );
}

export default AddBank;
