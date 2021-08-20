import SettingsMenu from '../SettingsMenu/SettingsMenu';
import PrivacyUpdate from '../forms/PrivacyUpdate/PrivacyUpdate';
import styles from './PrivacySafety.module.scss';

function PrivacySafety() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <SettingsMenu />
        </div>
        <div className={styles.middle}>
          <PrivacyUpdate />
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default PrivacySafety;
