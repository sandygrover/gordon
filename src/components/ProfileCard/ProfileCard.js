import { Image, Dropdown } from 'semantic-ui-react';
import styles from './ProfileCard.module.scss';

function ProfileCard({ imageUrl, name, profileId, accountType, backgroundUrl }) {
  return (
    <div className={styles.card} style={{ backgroundImage: 'url(' + backgroundUrl + ')' }}>
      <div className={styles.menu}>
        <Dropdown icon="ellipsis vertical">
          <Dropdown.Menu className={styles.option} style={{ 'margin-left': '-90px' }}>
            <Dropdown.Item text="Subscribe" />
            <Dropdown.Item text="Send Message" />
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.about}>
        <Image src={imageUrl} size="mini" alt={name} avatar />
        <div className={styles.user_status}>
          <strong>{name}</strong>
          <span>{profileId}</span>
        </div>
      </div>
      <div className={styles.type}>
        <span>{accountType}</span>
      </div>
    </div>
  );
}

export default ProfileCard;
