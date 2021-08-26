import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SubscriptionUpdate from '../forms/SubscriptionUpdate/SubscriptionUpdate';
import styles from './FansFollowing.module.scss';

function FansFollowing() {
  const [activeLink, setActiveLink] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <SettingsMenu />
        </div>
        <div className={styles.middle}>
          {!activeLink ? (
            <ul className={styles.list}>
              <li onClick={() => setActiveLink(true)}>
                <div>
                  <p>Following Price</p>
                  <span>Free</span>
                </div>
              </li>
            </ul>
          ) : (
            <div>
              <Icon
                className={styles.back_btn}
                onClick={() => {
                  setActiveLink(false);
                }}
                name="long arrow alternate left"
              />

              {activeLink && <SubscriptionUpdate activeLink={setActiveLink} />}
            </div>
          )}
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default FansFollowing;
