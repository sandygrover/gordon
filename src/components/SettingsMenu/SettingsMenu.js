import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from './SettingsMenu.module.scss';

function changeDarkMode() {

}

function SettingsMenu() {
  return (
    <div className={styles.SettingsMenu}>
      <ul>
        <li>
          <NavLink to="/settings/account#username">
            <span>User Name </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/profile">
            <span>Profile </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/account">
            <span>Acount </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li className={styles.spacer}></li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/privacy-safety">
            <span>Privacy and Safety </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/fans-following">
            <span>Fans and Following </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} to="/settings/notifications">
            <span>Notification </span> <Icon name="chevron right" />
          </NavLink>
        </li>
        <li className={styles.spacer}></li>
        <li>
          <NavLink to="#">
            <span onClick={() => changeDarkMode()}>Dark mode </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SettingsMenu;
