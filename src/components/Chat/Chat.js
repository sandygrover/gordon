import { Input } from 'semantic-ui-react';
import React from 'react';
import axios from 'axios';
import User from './User/User';
import styles from './Chat.module.scss';

// const users = [
//   {
//     image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
//     name: 'Patric Osborne',
//     message: 'Hey bro long time no see.'
//   },
//   {
//     image: 'https://react.semantic-ui.com/images/avatar/small/nan.jpg',
//     name: 'Kalen Cleln',
//     message: 'Are you good with the order.'
//   },
//   {
//     image: 'https://react.semantic-ui.com/images/avatar/small/zoe.jpg',
//     name: 'Zoe Conner',
//     message: 'You are so sweet.'
//   }
// ];

let users = [];

function Chat() {

  let [responseData, setResponseData] = React.useState(null);
  const fetchBusinesses = React.useCallback(() => {
    axios({
      "method": "GET",
      url: 'http://3.129.45.198/api/auth/users/creator',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      setResponseData(response.data.data);
      console.log("creator List");
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  React.useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.search}>
            <Input icon="search" className={styles.searchInput} placeholder="Search..." />
          </div>
          <div className={styles.user_list}>
            {/* {users &&
              users.map((user, i) => (
                <User key={i} profileImage={user.image} name={user.name} message={user.message} />
              ))} */}
              {responseData &&
              responseData.map((user, i) => (
                <User key={i} profileImage={user.profile ==  null ? 'https://react.semantic-ui.com/images/avatar/small/zoe.jpg' : user.profile} name={user.name} message={user.message} />
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
