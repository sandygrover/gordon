import { Image } from 'semantic-ui-react';
import styles from './User.module.scss';

function User(props) {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <Image className={styles.image} avatar spaced="right" src={props.profileImage} />
      </div>
      <div className={styles.profile}>
        <div className={styles.name}>
          {props.name} <span className={styles.latest_message}>{props.message}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
