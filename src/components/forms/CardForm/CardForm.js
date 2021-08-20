import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Form, Checkbox } from 'semantic-ui-react';
import {Formik } from 'formik';
import * as yup from 'yup';
import styles from './CardForm.module.scss';


const validationSchema = yup.object({
  number: yup
            .string('Enter your Card Number')
             .min(16,'Enter your Card Number')
             .max(16,'Enter your Card Number')
             .matches(/^[0-9]+$/, "Must be only digits")
             .required('Enter your Card Number'),
  

             expiry: yup
                        .string('Enter your Expiry')
                        .min(2,'Enter your Expiry')
                        .max(2,'Enter your Expiry')
                        .matches(/^[0-9]+$/, "Must be only digits")
                        .required('Enter your Expiry'),

                        security: yup.string('Enter your cvv')
                                      .min(3,'Enter your cvv')
                                      .max(4,'Enter your cvv')
                                      .matches(/^[0-9]+$/, "Must be only digits")
                                      .required('Enter your cvv'),

                                      name: yup.string('Enter your First Name')
                                               .min(4,'Enter your First Name')                                               
                                               .required('Enter your First Name'),


                                               last: yup.string('Enter your Last Name')
                                                        .min(4,'Enter your Last Name')
                                                        .required('Enter your last Name')
            
})








function AddBank() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successAlert = () => {
    Swal.fire({  
        title: 'successful',  
        text: 'Successfully card added  !!',
        icon: 'success'
      }); 
}
  return (
    <div className={styles.AddCard}>
      <h4>Add Credit/Debit Card</h4>
      
      <div className={styles.info_block}>       
       <Formik
       initialValues={{
         number:'',
         expiry:'',
         security:'',
         name:'',
         last:''
       }}

       validationSchema={validationSchema}
       validateOnChange={false}
       validateOnBlur={true}
       onSubmit={(values, actions) =>{
         setTimeout(() => {

           
         }, 1500);

       }}  
       >

         {({touched, errors, handleChange, handleBlur,handleSubmit, isSubmitting})=>(

         


        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
            
            name="number"
            type="Card number"
            onChange={handleChange}
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
            name="expiry" 
            className={styles.input} 
            placeholder="MM" 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.expiry && !!errors.expiry}
            />
            {errors.expiry && touched.expiry && <span style={{marginLeft:'10px'}}>{errors.expiry}</span>} 
            <Input
            type="expiry"
            name="expiry"
             className={styles.input} 
             placeholder="YY" 
             onBlur={handleBlur}
             onChange={handleChange}
             error={!!touched.expiry && !!errors.expiry}
            />
              {errors.expiry && touched.expiry && <span style={{marginLeft:'10px'}}>{errors.expiry}</span>} 
          </div>


          <Form.Field>
            <Input
            type="security"
            name="security" 
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
            <Checkbox toggle />
          </div>

          <div className={styles.button_submit}>
            <Button primary
            onClick={successAlert}
            disabled={isSubmitting}
            loading={isSubmitting}
            >
              <span>+ </span>Add Card
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
