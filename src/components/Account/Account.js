import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import AccountMenu from './AccountMenu';
import EmailUpdate from '../forms/EmailUpdate/EmailUpdate';
import PhoneUpdate from '../forms/PhoneUpdate/PhoneUpdate';
import PasswordUpdate from '../forms/PasswordUpdate/PasswordUpdate';
import TwoAuthUpdate from '../forms/TwoAuthUpdate/TwoAuthUpdate';
import AccountDelete from '../forms/AccountDelete/AccountDelete';
import ChangeAccount from '../forms/ChangeAccount/ChangeAccount';
import LoginSession from '../LoginSession/LoginSession';
import styles from './Account.module.scss';

function Account() {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();
  const { hash } = location;
  useEffect(() => {
    if (hash === '#username') {
      setActiveLink('user');
    }
  }, [hash]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <SettingsMenu />
        </div>
        <div className={styles.middle}>
          {!activeLink ? (
            <AccountMenu activeSetting={setActiveLink} />
          ) : (
            <div>
              <Icon
                className={styles.back_btn}
                onClick={() => {
                  setActiveLink(null);
                }}
                name="long arrow alternate left"
              />
              {activeLink === 'email' && <EmailUpdate />}
              {activeLink === 'phone' && <PhoneUpdate />}
              {activeLink === 'password' && <PasswordUpdate />}
              {activeLink === '2-auth' && <TwoAuthUpdate />}
              {activeLink === 'delete_account' && <AccountDelete />}
              {activeLink === 'user' && <ChangeAccount />}
              {activeLink === 'session' && <LoginSession />}
            </div>
          )}
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default Account;
