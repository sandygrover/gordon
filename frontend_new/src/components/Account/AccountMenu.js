import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from './Account.module.scss';

function AccountMenu({ activeSetting }) {
  return (
    <div className={styles.SettingsMenu}>
      <ul>
        <li>
          <NavLink to="#" onClick={() => activeSetting('user')}>
            <span>User Name </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('email')}>
            <span>Email </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('phone')}>
            <span>Phone Number </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li className={styles.spacer}></li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('password')}>
            <span>Password </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('session')}>
            <span>Login Session </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('2-auth')}>
            <span>Two step Authentication </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li className={styles.spacer}></li>
        <li>
          <NavLink to="#" onClick={() => activeSetting('delete_account')}>
            <span>Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AccountMenu;
