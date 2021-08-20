import { Input } from 'semantic-ui-react';
import User from './User/User';
import styles from './Chat.module.scss';

const users = [
  {
    image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    name: 'Patric Osborne',
    message: 'Hey bro long time no see.'
  },
  {
    image: 'https://react.semantic-ui.com/images/avatar/small/nan.jpg',
    name: 'Kalen Cleln',
    message: 'Are you good with the order.'
  },
  {
    image: 'https://react.semantic-ui.com/images/avatar/small/zoe.jpg',
    name: 'Zoe Conner',
    message: 'You are so sweet.'
  }
];

function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.search}>
            <Input icon="search" className={styles.searchInput} placeholder="Search..." />
          </div>
          <div className={styles.user_list}>
            {users &&
              users.map((user, i) => (
                <User key={i} profileImage={user.image} name={user.name} message={user.message} />
              ))}
          </div>



        </div>
        <div className={styles.messages}>
          <span className={styles.no_message}>No Messages</span>
        </div>
        <div className={styles.right} />
      </div>
    </div>
  );
}

export default Chat;
