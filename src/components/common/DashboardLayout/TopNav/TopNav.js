import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, Image, Label } from 'semantic-ui-react';
import HomeIcon from '../../../icons/HomeIcon';
import ChatIcon from '../../../icons/ChatIcon';
import PlusIcon from '../../../icons/PlusIcon';
import BellIcon from '../../../icons/BellIcon';
import ProfileIcon from '../../../icons/ProfileIcon';
import UserLinearIcon from '../../../icons/UserLinearIcon';
import BookmarkLinearIcon from '../../../icons/BookmarkLinearIcon';
import SettingsLinearIcon from '../../../icons/SettingsLinearIcon';
import CardLinearIcon from '../../../icons/CardLinearIcon';
import BankLinearIcon from '../../../icons/BankLinearIcon';
import HelpLinearIcon from '../../../icons/HelpLinearIcon';
import ExitLinearIcon from '../../../icons/ExitLinearIcon';
import styles from './TopNav.module.scss';

function logout() {
  localStorage.clear();
  Swal.fire({
    title: 'Success',
    text: 'Logout Successfully',
    icon: 'success'
  }).then(() => {
    window.location.reload()
  });
}

function TopNav() {
  const { location } = window;
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className={[styles.TopNav, styles.TopNav__active].join(' ')}>
        <div className={styles.container}>
          <div className={styles.wrap}>
            <div className={styles.hamburger_col}>
              <div onClick={() => setVisible(true)} className={styles.hamburger}>
                <span className={styles.line}></span>
                <span className={[styles.line, styles.line__middle].join(' ')}></span>
                <span className={[styles.line, styles.line__bottom].join(' ')}></span>
              </div>
            </div>
            <div className={styles.menu}>
              <ul>
                <li>
                  <NavLink to="/home" activeClassName={styles.active}>
                    <HomeIcon />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chat" activeClassName={styles.active}>
                    <ChatIcon />
                    <span>Chat</span>
                  </NavLink>
                </li>
                {
                  ( localStorage.getItem('role') == 'creator' ) ? <li>
                  <NavLink to="/add-post" activeClassName={styles.active}>
                    <PlusIcon />
                    <span>Add Post</span>
                  </NavLink>
                  </li> : <span></span>
                }

                <li>
                  <NavLink to="/notifications" activeClassName={styles.active}>
                    <BellIcon />
                    <span>Notifications</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" activeClassName={styles.active}>
                    <ProfileIcon />
                    <span>Profile</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={styles.search}>
              <Input icon="search" className={styles.searchInput} placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
      <div className={[styles.side_menu, visible ? styles.side_menu__active : ''].join(' ')}>
        <div className={styles.close} onClick={() => setVisible(false)} />
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image src={localStorage.getItem('profile') == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : localStorage.getItem('profile')} size="tiny" alt={localStorage.getItem('name')} avatar />
            <Label circular color={'green'} empty className={styles.label} />
          </div>
          <div className={styles.name}>{localStorage.getItem('name')}</div>
          <div className={styles.stats}>
            <NavLink to='/fans'>
              <span>12 Fans</span>
            </NavLink>
            <NavLink to='/following'>
              <span>10 Followings</span>
            </NavLink>
          </div>
        </div>
        <div className={styles.profile_menu}>
          <ul>
            <li>
              <NavLink to="/profile" activeClassName={styles.active}>
                <UserLinearIcon />
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks" activeClassName={styles.active}>
                <BookmarkLinearIcon />
                Bookmarks
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings/profile" className={location.pathname.includes('settings') ? styles.active : ''}>
                <SettingsLinearIcon />
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/cards" activeClassName={styles.active}>
                <CardLinearIcon />
                Cards
              </NavLink>
            </li>
            <li>
              <NavLink to="/bank" activeClassName={styles.active}>
                <BankLinearIcon />
                Bank
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" activeClassName={styles.active}>
                <HelpLinearIcon />
                Help
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink onClick={ () => logout() } to="/logout" activeClassName={styles.active}>
                <ExitLinearIcon className={styles.rotate_180} />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
