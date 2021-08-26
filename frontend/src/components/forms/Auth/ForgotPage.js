import React from 'react'
import { Button, Input, Icon, Form, Divider, Image } from 'semantic-ui-react';
import styles from './ForgotPage.module.scss';


function ForgotPage  ()  {
    return (
        <div>
        <div className="logo-text"><Image src={process.env.PUBLIC_URL + '/images/Friday.png'} style={{width:'50%  '}} /></div>
        <div className="logo_tag">Create Amazing Content</div>
        <p>Dive into the FNT with your free account and start earning between $1,499 to $7,495 per month.</p>

        <Form >
            <Form.Field>
              <Input
                name="email"
                type="email"
                className={styles.borderBottom}

                placeholder="Email"
              />

            </Form.Field>
            <Button

              className={styles.button_fluid}
              primary
              type="submit"
            >
              Forgot Password
            </Button>
            </Form>
        </div>
    )
}

export default ForgotPage;
