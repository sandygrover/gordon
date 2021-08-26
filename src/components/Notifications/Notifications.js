import { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from 'semantic-ui-react';
import styles from './Notifications.module.scss';

let data = [];

// const data = [
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   },
//   {
//     color: 'blue',
//     type: 'liked',
//     message: 'Emiliy liked your post',
//     time: 'Now'
//   },
//   {
//     color: 'red',
//     type: 'tip',
//     message: 'You have recieved $1 from Clark',
//     time: '1 h ago'
//   }
// ];

function Notifications() {

  axios({
    "method": "GET",
    url: 'http://3.129.45.198/api/auth/get-notifications',
    data: {
    },
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    data = response.data.data;
  })
  .catch((error) => {
    console.log(error)
  })

  const [notifyData, setNotifyData] = useState([]);
  const [tabkey, setTabkey] = useState('all');

  useEffect(() => {
    setNotifyData(data);
  }, []);

  const filterNotificationHandler = (value = 'all') => {
    setTabkey(value);
    if (value === 'all') {
      setNotifyData(data);
    } else {
      const filteredData = data.filter((item) => {
        return item.type === value;
      });
      setNotifyData(filteredData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.wall}>
          <div className={styles.tabs}>
            <div
              className={[styles.tab, tabkey === 'all' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterNotificationHandler('all')}
            >
              All
            </div>
            <div
              className={[styles.tab, tabkey === 'liked' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterNotificationHandler('liked')}
            >
              Liked
            </div>
            <div
              className={[styles.tab, tabkey === 'subscribe' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterNotificationHandler('subscribe')}
            >
              Subscribed
            </div>
            <div
              className={[styles.tab, tabkey === 'tip' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterNotificationHandler('tip')}
            >
              Tipped
            </div>
            <div
              className={[styles.tab, tabkey === 'promotion' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterNotificationHandler('promotion')}
            >
              Promotion
            </div>
          </div>
          <ul className={styles.list_item}>
            {notifyData.length > 0
              ? notifyData.map((item, i) => (
                  <li data-type={item.type} key={i}>
                    <Label className={styles.label} circular color={item.color} empty />
                    <div className={styles.notification_message}>
                      <p>{item.message}</p>
                      <p>
                        <span>{item.time}</span>
                      </p>
                    </div>
                  </li>
                ))
              : 'No result found'}
          </ul>
        </div>
        <div className={styles.right}> </div>
      </div>
    </div>
  );
}

export default Notifications;
