import React, {useState }from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Input, Form, Checkbox } from 'semantic-ui-react';
import {Formik } from 'formik';
import * as yup from 'yup';
import styles from './CardForm.module.scss';

function AddBank() {
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

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successAlert = () => {
    Swal.fire({
        title: 'successful',
        text: 'Successfully card added  !!',
        icon: 'success'
    });
  }

  const validationSchema = yup.object({
    number: yup.string('Enter your Card Number')
    .min(16,'Enter your Card Number')
    .max(16,'Enter your Card Number')
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Enter your Card Number')
    .default((responseData[0] && responseData[0].card_number) ? responseData[0].card_number : '' ),
    // expiry: yup.string('Enter your Expiry')
    // .min(2,'Enter your Expiry')
    // .max(2,'Enter your Expiry')
    // .matches(/^[0-9]+$/, "Must be only digits")
    // .required('Enter your Expiry'),
    security: yup.string('Enter your cvv')
    .min(3,'Enter your cvv')
    .max(4,'Enter your cvv')
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Enter your cvv')
    .default((responseData[0] && responseData[0].cvv) ? responseData[0].cvv : '' ),
    name: yup.string('Enter your First Name')
    .min(4,'Enter your First Name')
    .required('Enter your First Name')
    .default((responseData[0] && responseData[0].first_name) ? responseData[0].first_name : '' ),
    mm: yup.string('Enter your mm')
    .required('Enter your mm')
    .default((responseData[0] && responseData[0].expiry) ? (responseData[0].expiry).split('/')[0] : '' ),
    yy: yup.string('Enter your mm')
    .required('Enter your mm')
    .default((responseData[0] && responseData[0].expiry) ? (responseData[0].expiry).split('/')[1] : '' ),
    last: yup.string('Enter your Last Name')
    .min(4,'Enter your Last Name')
    .required('Enter your last Name')
    .default((responseData[0] && responseData[0].last_name) ? responseData[0].last_name : '' ),
  })

  return (
    <div className={styles.AddCard}>
      <h4>Add Credit/Debit Card</h4>
      <div className={styles.info_block}>
       <Formik
        enableReinitialize={true}
       initialValues={{
        //  number:(responseData[0] && responseData[0].card_number) ? responseData[0].card_number : '',
        //  mm:(responseData[0] && responseData[0].expiry) ? responseData[0].expiry.split('/')[0] : '',
        //  yy:(responseData[0] && responseData[0].expiry) ? responseData[0].expiry.split('/')[1] : '',
        //  security:(responseData[0] && responseData[0].cvv) ? responseData[0].cvv : '',
        //  name:(responseData[0] && responseData[0].first_name) ? responseData[0].first_name : '',
        //  last:(responseData[0] && responseData[0].last_name) ? responseData[0].last_name : ''
          number:'',
          mm:'',
          yy:'',
          security:'',
          name:'',
          last:''
       }}
       validationSchema={validationSchema}
      //  validateOnChange={false}
       validateOnBlur={true}
       onSubmit={(values, actions) =>{
         console.log(values);
        axios({
          method: 'post',
          url: 'http://3.129.45.198/api/auth/add-card',
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
          data: {
            card_number:values.number,
            expiry:values.mm+'/'+values.yy,
            cvv:values.security,
            first_name:values.name,
            last_name:values.last,
            is_active:values.is_active == 0 ? 1 : 0
          },
        }).then(function(response) {
          Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          }).then(() => {
            actions.setSubmitting(false);
          });
        });
       }}>
         {({ touched, errors, onChange, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
            name="number"
            type="Card number"
            onChange={handleChange}
            defaultValue={responseData[0] && responseData[0].card_number}
            onBlur={handleBlur}
            className={styles.input}
            placeholder="Card Number"
            error={!!touched.number && !!errors.number}
            />
            {errors.number && touched.number && <span className={'error-text'}>{errors.number}</span>}
          </Form.Field>
          <div className={styles.inline_fields}>
            <p style={{marginRight:'10px'}}>Expiry</p>
            <Input
            type="expiry"
            name="mm"
            defaultValue={responseData[0] && (responseData[0].expiry).split("/")[0]}
            className={styles.input}
            placeholder="MM"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.mm && !!errors.mm}
            />
            {errors.mm && touched.mm && <span style={{marginLeft:'10px'}}>{errors.mm}</span>}
            <Input
             type="expiry"
             name="yy"
             defaultValue={responseData[0] && (responseData[0].expiry).split("/")[1]}
             className={styles.input}
             placeholder="YY"
             onBlur={handleBlur}
             onChange={handleChange}
             error={!!touched.yy && !!errors.yy}
            />
              {errors.yy && touched.yy && <span style={{marginLeft:'10px'}}>{errors.yy}</span>}
          </div>
          <Form.Field>
            <Input
            type="security"
            name="security"
            defaultValue={responseData[0] && responseData[0].cvv}
            className={styles.input}
            placeholder="Security Code"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.security && !!errors.security}
            />
            {errors.security && touched.security && <span>{errors.security}</span>}
          </Form.Field>
          <Form.Field>
            <Input
            type="name"
            defaultValue={responseData[0] && responseData[0].first_name}
            name="name"
            className={styles.input}
            placeholder="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.name && !!errors.name}
            />
            {errors.name && touched.name && <span>{errors.name}</span>}
          </Form.Field>
          <Form.Field>
            <Input
            type='last'
            defaultValue={responseData[0] && responseData[0].last_name}
            name="last"
            className={styles.input}
            placeholder="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.last && !!errors.last}
            />
            {errors.last && touched.last && <span>{errors.last}</span>}
          </Form.Field>
          <div className={styles.inline_fields} style={{ marginTop: 25 }}>
            <span>You can remove this card</span>
            <Checkbox name="is_active" defaultValue={responseData[0] && responseData[0].is_active == 0 ? 1 : 0 } toggle />
          </div>
          <div className={styles.button_submit}>
            {/* <Button primary
            onClick={successAlert}
            disabled={isSubmitting}
            loading={isSubmitting}
            > */}
            {/* <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              className={styles.button_fluid}
              primary
              type="submit"
            >
            <span>+ </span>Add Card
            </Button> */}
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              // onClick={PostData}
              className={styles.button_fluid}
              primary
              type="submit"
            >
              Add Card
            </Button>
          </div>
        </Form>
        )}
        </Formik>
      </div>
    </div>
  );
}

export default AddBank;
