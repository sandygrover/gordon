import SettingsMenu from '../SettingsMenu/SettingsMenu';
import ProfileForm from '../forms/ProfileForm/ProfileForm';
import styles from './ProfileSettings.module.scss';

function ProfileSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <SettingsMenu />
        </div>
        <div className={styles.middle}>
          <ProfileForm />
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default ProfileSettings;
