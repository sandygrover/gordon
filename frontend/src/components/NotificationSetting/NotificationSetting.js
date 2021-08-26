import SettingsMenu from '../SettingsMenu/SettingsMenu';
import NotificationUpdate from '../forms/NotificationUpdate/NotificationUpdate';
import styles from './NotificationSetting.module.scss';

function NotificationSetting() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <SettingsMenu />
        </div>
        <div className={styles.middle}>
          <NotificationUpdate />
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default NotificationSetting;
